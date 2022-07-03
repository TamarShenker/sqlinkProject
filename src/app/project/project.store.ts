import {Injectable} from '@angular/core';
import {createStore, select} from "@ngneat/elf";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";
import {getAllEntities, setEntities, withEntities} from "@ngneat/elf-entities";
import {ProjectState} from "./project.state";

const projectStore = createStore(
  {name: 'project'},
  withEntities<ProjectState>({idKey: 'id'}),
);

const persist = persistState(projectStore, {
  key: "auth",
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreRepository {

  setProjects(projects: any) {
    projectStore.update(setEntities(projects))
  }

  getAllProjects() {
    return projectStore.query(getAllEntities());
  }
}
