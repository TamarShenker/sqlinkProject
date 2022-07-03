export interface ProjectState {
  id:number,
  project?: {
    id: number,
    name: String,
    score: number,
    durationInDays: Date,
    bugsCount: number,
    madeDadeline:boolean,
  }
}
