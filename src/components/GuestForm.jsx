import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GuestForm = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({ name: '', imageUrl: '' });
    const [invitado, setInvitado] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: '',
        email: '',
        ingreso: false
    });
    const [errors, setErrors] = useState({}); // Estado para errores de validación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvitado({ ...invitado, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!invitado.nombre) tempErrors.nombre = "El nombre es obligatorio."; // Validación de nombre
        if (!invitado.apellido) tempErrors.apellido = "El apellido es obligatorio."; // Validación de apellido
        if (!invitado.dni) tempErrors.dni = "El DNI es obligatorio."; // Validación de DNI
        else if (!/^\d+$/.test(invitado.dni)) tempErrors.dni = "El DNI debe contener solo números."; // Validación de formato de DNI
        if (!invitado.fechaNacimiento) tempErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria."; // Validación de fecha de nacimiento
        if (!invitado.email) tempErrors.email = "El correo electrónico es obligatorio."; // Validación de email
        else if (!/\S+@\S+\.\S+/.test(invitado.email)) tempErrors.email = "El correo electrónico no es válido."; // Validación de formato de email
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`htt://app-lautaro-backend-2-209isbdba-nirvanas-projects-8e30d85c.vercel.app/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Detener el envío si la validación falla
        console.log(`Event ID: ${eventId}`);
        try {
            const response = await axios.post(`http://app-lautaro-backend-2-209isbdba-nirvanas-projects-8e30d85c.vercel.app/${eventId}/guests`, invitado);
            console.log('Invitado creado:', response.data);
            setInvitado({
                nombre: '',
                apellido: '',
                dni: '',
                fechaNacimiento: '',
                email: '',
                ingreso: false
            });
        } catch (error) {
            console.error('Error al crear el invitado:', error);
        }
    };

    return (
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg max-w-2xl mx-auto">
            {event.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                    <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover md:h-64" />
                </div>
            )}
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-700">{event.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={invitado.nombre}
                        onChange={handleChange}
                        className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} // Agregar clase de error si hay error
                        placeholder="Nombre del invitado"
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-2">{errors.nombre}</p>}  
                </div>
                <div>
                    <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={invitado.apellido}
                        onChange={handleChange}
                        className={`w-full border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} // Agregar clase de error si hay error
                        placeholder="Apellido del invitado"
                    />
                    {errors.apellido && <p className="text-red-500 text-xs mt-2">{errors.apellido}</p>}  
                </div>
                <div>
                    <label htmlFor="dni" className="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                    <input
                        type="text"
                        id="dni"
                        name="dni"
                        value={invitado.dni}
                        onChange={handleChange}
                        className={`w-full border ${errors.dni ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} // Agregar clase de error si hay error
                        placeholder="DNI del invitado"
                    />
                    {errors.dni && <p className="text-red-500 text-xs mt-2">{errors.dni}</p>}  
                </div>
                <div>
                    <label htmlFor="fechaNacimiento" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={invitado.fechaNacimiento}
                        onChange={handleChange}
                        className={`w-full border ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} // Agregar clase de error si hay error
                    />
                    {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-2">{errors.fechaNacimiento}</p>}  
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={invitado.email}
                        onChange={handleChange}
                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} // Agregar clase de error si hay error
                        placeholder="Correo electrónico del invitado"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}  
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Agregar Invitado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GuestForm;
