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
            const { data, error: dbError } = await supabaseAdmin
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


export const GetUser = async (req, res) =>{
    try{
        console.log("Consultando a Supabase....");
        const { data, error } = await supabaseAdmin
        .from('Usuarios')
        .select(`
            id_usuario,
            nombre,
            apellido,
            correo,
            avatar_id
            `);

        if(error){
            console.error("Error de Supabase: ", error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log("Usuarios obtenidos con exito");
        return res.status(200).json(data);
    
    } catch(error){
        console.error("Errro critico en el servidor", error);

        if(!res.headersSent){
            res.status(500).json({ message: "Error interno" });
        }
    }
};


export const UpdateUser = async (req, res) =>{
    const { id } = req.params;
    const { nombre, apellido, correo, avatar_id } = req.body;

    const userId = id?.trim();

    if (!userId) {
        return res.status(400).json({ error: "Se requiere un ID de usuario válido." });
    }

    try{
        if (correo) {
            const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
                userId,
                { email: correo }
            );

            if (authError) {
                console.error("Error en Auth: ", authError.message);
                return res.status(400).json({ error: "No se pudo actualizar el acceso: " + authError.message });
            }
        }
        
        const updateData = {};
        if (nombre !== undefined) updateData.nombre = nombre;
        if (apellido !== undefined) updateData.apellido = apellido;
        if (correo !== undefined) updateData.correo = correo;
        if (avatar_id !== undefined) updateData.avatar_id = avatar_id;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
        }

        const { data, error: dbError } = await supabaseAdmin
            .from('Usuarios')
            .update(updateData)
            .eq('id_usuario', userId)
            .select();
    
        if (dbError) throw dbError;

        if (!data || data.length === 0){
            return res.status(400).json({ message: "Usuario no encontrado en la base de datos "});
        };

        return res.json({
            message: "Usuario actualizado con exito en Auth y base de datos",
            usuario: data[0]
        });
    
    } catch(error){
        console.log("Error en UpdateUser: ", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const LoginUser = async (req, res) =>{
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña){
        return res.status(400).json({error: "El correo y la contraseña son obligatorios."});
    }

    try{
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            correo,
            contraseña,
        });

        if (authError){
            console.error("Detalle error Supabase Auth: ", authError.message, authError.status);
            return res.status(401).json({
                error: "Credenciales invalidas",
                detalle: authError.message
            });
        }

        const userId = authData.user?.id;

        const { data: usuariosTabla, error: dbError } = await supabase
            .from('Usuarios')
            .select(`
                id_usuario,
                nombre,
                apellido,
                correo,
                avatar_id
            `)
            .eq('id_usuario', userId)
            .single();

        if (dbError){
            console.error("Error al consultar la tabla Usuario: ", dbError.message);
        }

        return res.json({
            message: "Inicio de sesion exitoso",
            token: authData.session.access_token,
            refresh_token: authData.session.refresh_token,
            user: {
                id: authData.user.id,
                correo: authData.user.email,
            }
        });
            
    } catch (error){
        console.error("Error en LoginUser: ", error);
        return res.status(500).json({ error: "Error interno del servidor al intentar iniciar sesion. "});
    }
};