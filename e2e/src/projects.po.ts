import {browser, by, element} from 'protractor';


export class ProjectsPage {
  navigateTo() {
    return browser.get('/');
  }

  getAddNewProjectButton() {
    return element(by.cssContainingText('button', 'add new project'));
  }

  getProjectList() {
    return element(by.id('projectEntry'));

  }
}
