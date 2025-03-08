import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!nombre || !apellido || !email || !username || !password) {
      setError('Todos los campos son requeridos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Error en el registro');
      }

      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      setError((err as Error).message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        width: '100%',
      }}
    >
      {/* Primera fila: Nombre y Apellido */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            required
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <TextField
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            fullWidth
            required
          />
        </motion.div>
      </Box>

      {/* Segunda fila: Contraseña y Username */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <TextField
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
        </motion.div>
      </Box>

      {/* Tercera fila: Email (ancho completo) */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
      </motion.div>

      {/* Mensajes de error o éxito */}
      {error && (
        <Typography variant="body2" sx={{ color: '#f56565', textAlign: 'center', fontSize: '0.875rem' }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body2" sx={{ color: '#2ecc71', textAlign: 'center', fontSize: '0.875rem' }}>
          {success}
        </Typography>
      )}

      {/* Botón de registro */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#2ecc71' }}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </motion.div>

      {/* Enlace a login */}
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: '#718096', fontSize: '0.9rem', mt: 1 }}
      >
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#27a35e', textDecoration: 'none' }}>
          Iniciar sesión
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;