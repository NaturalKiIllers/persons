module.exports = mongoose => {
    const Persona = mongoose.model(
        "persona",
        mongoose.Schema(
            {
                Nombre: String,
                Apellido: String,
                correo: String,
                estado: Boolean
            },
            {timestamps: true}
        )
    );
    return Persona;
};