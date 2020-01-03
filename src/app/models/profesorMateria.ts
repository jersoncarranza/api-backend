
    export class ProfesorMateria{
        constructor(
            public _id: String,
            public profesor: String,
            public materia: String,
            public estado: Number, 
            public enabled:Boolean,
            public created_at: String,
            public periodo: String,
            public numero: Number,
            public calificacion:Number,
            public estudiantes: Number
        ) {}
    }
    
    