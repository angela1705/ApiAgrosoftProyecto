from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
import pandas as pd
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from io import BytesIO
from datetime import datetime
from apps.Cultivo.cosechas.models import Cosecha
from apps.Cultivo.cosechas.api.serializers import CosechaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class CosechaViewSet(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Cosecha.objects.all().select_related('id_cultivo')
    serializer_class = CosechaSerializer

    @action(detail=False, methods=['get'])
    def reporte(self, request):
        cosechas = self.get_queryset()
        serializer = self.get_serializer(cosechas, many=True)
        data = serializer.data
        
        formato = request.query_params.get('formato', None)
        
        if formato == 'pdf':
            return self.generar_pdf_profesional(data)
        elif formato == 'excel':
            return self.generar_excel_mejorado(data)
        else:
            return Response(data)

    def generar_pdf_profesional(self, data):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_cosechas_profesional.pdf"'
        
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, 
                              rightMargin=inch/2, leftMargin=inch/2,
                              topMargin=inch/2, bottomMargin=inch/2)
        
        elements = []
        
        styles = getSampleStyleSheet()
        title_style = styles['Title']
        heading_style = styles['Heading2']
        body_style = styles['BodyText']
        small_style = ParagraphStyle(
            'small',
            parent=styles['BodyText'],
            fontSize=8,
            textColor=colors.grey
        )
        
        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png" 
        try:
            logo = Image(logo_path, width=1.5*inch, height=1*inch)
            elements.append(logo)
        except:
            pass
        
        elements.append(Spacer(1, 0.5*inch))
        elements.append(Paragraph("Reporte de Cosechas", title_style))
        elements.append(Paragraph("Sistema de Gestión Agrícola", heading_style))
        elements.append(Spacer(1, 0.5*inch))
        
        meta_data = [
            ["Generado el:", datetime.now().strftime("%Y-%m-%d %H:%M")],
            ["Total de registros:", len(data)],
            ["Generado por:", self.request.user.get_full_name() or self.request.user.username]
        ]
        
        meta_table = Table(meta_data, colWidths=[1.5*inch, 3*inch])
        meta_table.setStyle(TableStyle([
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 10),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        
        elements.append(meta_table)
        elements.append(Spacer(1, inch))
        elements.append(Paragraph("Objetivo del Reporte:", heading_style))
        elements.append(Paragraph(
            "Este documento presenta un resumen detallado de las cosechas registradas en el sistema, "
            "incluyendo información sobre cultivos, cantidades recolectadas y fechas de cosecha. "
            "El objetivo es proporcionar una visión general del rendimiento agrícola para facilitar "
            "la toma de decisiones y el análisis de productividad.", body_style))
        
        elements.append(PageBreak())  
        
        elements.append(Paragraph("Resumen General", heading_style))
        
        total_cantidad = sum(item['cantidad'] for item in data)
        unidades = list(set(item['unidades_de_medida'] for item in data))
        fechas = sorted(item['fecha'] for item in data)
        
        resumen_data = [
            ["Total de cosechas registradas:", len(data)],
            ["Periodo cubierto:", f"{min(fechas)} al {max(fechas)}"],
            ["Total producido:", f"{total_cantidad} {unidades[0] if len(unidades) == 1 else 'varias unidades'}"],
            ["Cultivos incluidos:", len(set(item['id_cultivo'] for item in data))],
        ]
        
        resumen_table = Table(resumen_data, colWidths=[2.5*inch, 3*inch])
        resumen_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#4F81BD')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 10),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.lightgrey),
        ]))
        
        elements.append(resumen_table)
        elements.append(Spacer(1, 0.3*inch))
        
        elements.append(Paragraph("Detalle de Cosechas", heading_style))
        
        table_data = [["ID Cultivo", "Cantidad", "Unidad", "Fecha"]]
        for item in data:
            table_data.append([
                item['id_cultivo'],
                item['cantidad'],
                item['unidades_de_medida'],
                item['fecha']
            ])
        
        table = Table(table_data, colWidths=[1.5*inch, 1*inch, 1*inch, 1.5*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#4F81BD')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,0), 10),
            ('FONTSIZE', (0,1), (-1,-1), 9),
            ('BOTTOMPADDING', (0,0), (-1,0), 12),
            ('BACKGROUND', (0,1), (-1,-1), colors.beige),
            ('GRID', (0,0), (-1,-1), 1, colors.lightgrey),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        
        elements.append(table)
        
        def add_footer(canvas, doc):
            canvas.saveState()
            canvas.setFont('Helvetica', 8)
            canvas.setFillColor(colors.grey)
            canvas.drawString(inch/2, 0.75*inch, f"Página {doc.page}")
            canvas.drawRightString(7.5*inch, 0.75*inch, 
                                 f"Generado el {datetime.now().strftime('%Y-%m-%d')}")
            canvas.restoreState()
        
        doc.build(elements, onFirstPage=add_footer, onLaterPages=add_footer)
        
        pdf = buffer.getvalue()
        buffer.close()
        response.write(pdf)
        return response

    def generar_excel_mejorado(self, data):
        df = pd.DataFrame(data)
        
        resumen = {
            'Total de cosechas': [len(data)],
            'Primera fecha': [min(item['fecha'] for item in data)],
            'Última fecha': [max(item['fecha'] for item in data)],
            'Total producido': [sum(item['cantidad'] for item in data)],
            'Unidades': ', '.join(set(item['unidades_de_medida'] for item in data))
        }
        df_resumen = pd.DataFrame(resumen)
        
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="reporte_cosechas_mejorado.xlsx"'
        
        with pd.ExcelWriter(response, engine='xlsxwriter') as writer:
            df_resumen.to_excel(writer, sheet_name='Resumen', index=False)
            
            df.to_excel(writer, sheet_name='Detalle', index=False)
            
            workbook = writer.book
            worksheet_resumen = writer.sheets['Resumen']
            worksheet_detalle = writer.sheets['Detalle']
            
            header_format = workbook.add_format({
                'bold': True,
                'text_wrap': True,
                'valign': 'top',
                'fg_color': '#4F81BD',
                'font_color': 'white',
                'border': 1
            })
            
            data_format = workbook.add_format({
                'text_wrap': True,
                'valign': 'top',
                'border': 1
            })
            
            for col_num, value in enumerate(df_resumen.columns.values):
                worksheet_resumen.write(0, col_num, value, header_format)
                worksheet_resumen.set_column(col_num, col_num, max(len(str(value)) + 2, 15))
            
            for col_num, value in enumerate(df.columns.values):
                worksheet_detalle.write(0, col_num, value, header_format)
                worksheet_detalle.set_column(col_num, col_num, max(len(str(value)) + 2, 15))
            
            for row in range(1, len(df_resumen)+1):
                for col in range(len(df_resumen.columns)):
                    worksheet_resumen.write(row, col, df_resumen.iloc[row-1, col], data_format)
            
            for row in range(1, len(df)+1):
                for col in range(len(df.columns)):
                    worksheet_detalle.write(row, col, df.iloc[row-1, col], data_format)
            
            worksheet_detalle.freeze_panes(1, 0)
            
            worksheet_detalle.autofilter(0, 0, len(df), len(df.columns)-1)
        
        return response