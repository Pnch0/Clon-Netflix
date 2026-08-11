import { supabase, supabaseAdmin } from "../Services/supabase.js";

export const CreateUser = async (req, res) =>{
    const { nombre, apellido, correo, contraseña, avatar_id } = req.body;

    if (!nombre || !apellido || !correo || !contraseña){
        return res.status(400).json({ error: "Nombre, apellido, correo y contraseña son obligatorios."});
    }

    let userId = null;
    
    try{
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: correo,
            password: contraseña,
            email_confirm: true
        });

        if (authError) throw authError;

        userId = authData.user?.id;

        if (userId){
            const { data, error: dbError } = await supabase
            .from('Usuarios')
            .insert([
                {
                    id_usuario: userId,
                    nombre,
                    apellido,
                    correo,
                    avatar_id: avatar_id || null
                }
            ])
            .select();

            if (dbError) {
                console.error("Error de DB detectado: ", dbError);
                throw dbError;
            }

            return res.status(201).json({
                message: "Usuario creado con exito",
                usuario: data[0]
            });
        }
    } catch (error) {
        console.error("Error detectado en el proceso de registro: ", error.message);
        
        if (userId && supabaseAdmin) {
            try {
                console.log(`Eliminando usuario ${userId} en Auth por fallo en la base de datos...`);
                await supabaseAdmin.auth.admin.deleteUser(userId);
            } catch (adminError) {
                console.error("No se pudo limpiar el usuario de Auth automáticamente: ", adminError.message);
            }
        }

        return res.status(500).json({
            error: "Hubo un problema al registrar al usuario",
            detalle: error.message
        });
    }
};
