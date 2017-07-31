import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, user_id: 1, name: "Bernard", race: 1, state: 0, xp: 0, level: 1, life: 100}
    ];
    return {heroes};
  }
}