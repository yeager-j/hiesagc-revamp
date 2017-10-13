export class User {
  constructor(
    public _id: string,
    public username: string,
    public name: string,
    public email: string,
    public rank: number,
    public dues_paid: number,
    public title: string,
    public date_created: Date
  ) { }

  rankName() {
    switch (this.rank) {
      case 0:
        return "Admin";
      case 1:
        return "Officer";
      case 2:
        return "Member";
    }
  }
}
