export class EstrellasEvaluacion{
    constructor(
        public _id: String,
        public idEvaluacionProfesor: String,
        public idEstudiante: String,
        public calificacion: Number,
        public created_at: String,
        public estado: Number,
        public enabled:Boolean
        ) {}
}

