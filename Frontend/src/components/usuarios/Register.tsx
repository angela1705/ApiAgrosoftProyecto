import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}`;

const Register: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [numero_documento, setNumero_documento] = useState<number>();
  const [apellido, setApellido] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!nombre || !apellido || !email ||!numero_documento) {
      setError('Todos los campos son requeridos');
      setLoading(false);
      
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/registro/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, numero_documento }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data) {
          const parsedErrors: { [key: string]: string } = {};
          
          Object.entries(data).forEach(([key, value]) => {
            parsedErrors[key] = Array.isArray(value) ? value.join(', ') : String(value);
          });
          setFieldErrors(parsedErrors); // ⬅️ Ahora se está usando
          throw new Error('Corrige los campos marcados');
        }
        throw new Error('Error en el registro');
      }
      
      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      setError((err as Error).message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fff', // Fondo blanco
      transition: 'all 0.3s ease-in-out',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
      '& .MuiInputAdornment-root': {
        backgroundColor: 'inherit', // Fondo uniforme con el campo
        height: '100%',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#a0aec0',
      '&.Mui-focused': { color: '#2ecc71' },
    },
  };

 return (
  <Box
    component="form"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5,
      width: '100%',
    }}
    onSubmit={handleSubmit}
  >
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <motion.div  animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
<TextField
  fullWidth
  error={!!fieldErrors.nombre}
  helperText={fieldErrors.nombre}
  label="Nombre"
  
  sx={textFieldStyles}
  value={nombre}
  onChange={(e) => {
    const value = e.target.value;

    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNombre(value);
      setFieldErrors((prev) => ({ ...prev, nombre: '' }));
    } else {
      setFieldErrors((prev) => ({ ...prev, nombre: 'Solo se permiten letras y espacios' }));
    }
  }}
/>
      </motion.div>
    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.8 }}>
<TextField
  fullWidth
  error={!!fieldErrors.apellido}
  helperText={fieldErrors.apellido}
  label="Apellido"
  sx={textFieldStyles}
  value={apellido}
  onChange={(e) => {
    const value = e.target.value;

    if (/^[a-zA-Z\s]*$/.test(value)) {
      setApellido(value);
      setFieldErrors((prev) => ({ ...prev, apellido: '' }));
    } else {
      setFieldErrors((prev) => ({ ...prev, apellido: 'Solo se permiten letras y espacios' }));
    }
  }}
/>
        </motion.div>
    </Box>


      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
    <TextField
      fullWidth
      error={!!fieldErrors.numero_documento}
      helperText={fieldErrors.numero_documento}
      label="Numero de documento"
      sx={textFieldStyles}
      type="number"
      value={numero_documento ?? ''}
      onChange={(e) => {
        const value = e.target.value;

        setNumero_documento(value === '' ? undefined : Number(value));
      }}
    />
      </motion.div>

    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.8 }}>
      <TextField
        fullWidth
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        label="Email"
        sx={textFieldStyles}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </motion.div>

    {error && (
      <Typography  sx={{ color: '#f56565', textAlign: 'center', fontSize: '0.875rem' }} variant="body2">
        {error}
      </Typography>
    )}
    {success && (
      <Typography sx={{ color: '#2ecc71', textAlign: 'center', fontSize: '0.875rem' }} variant="body2">
        {success}
      </Typography>
    )}

    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}  transition={{ duration: 0.5, delay: 1 }}>
      <Button
        fullWidth
        disabled={loading}
        sx={{ backgroundColor: '#2ecc71' }}
        type="submit"
        variant="contained"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </motion.div>

    <Typography
      sx={{ textAlign: 'center', color: '#718096', fontSize: '0.9rem', mt: 1 }}
      variant="body2"
    >
      ¿Ya tienes cuenta?{' '}
      <Link style={{ color: '#27a35e', textDecoration: 'none' }} to="/login" >
        Iniciar sesión
      </Link>
    </Typography>
  </Box>
);

};

export default Register;