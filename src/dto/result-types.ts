export class ResultData {
  constructor(public title: string, public meta: Meta[]) {}
}

export class Meta {
  constructor(public name: string, public value: string) {}
}

export class ResultInput {
  constructor(public reference_id: number, public data: ResultData) {}
}
