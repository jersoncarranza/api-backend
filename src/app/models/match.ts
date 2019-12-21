export class Match{
    constructor(
        public estado:     Number,
        public created_at: String,
        public viewed:     Number,
        public liked:      Boolean,
        public emitter:    String,
        public receiver:   String
        ) {}
}

