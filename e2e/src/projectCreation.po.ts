import {browser, by, element} from 'protractor';


export class ProjectCreationPage {
  navigateTo() {
    return browser.get('/');
  }

  getProjectNameInput() {
    return element(by.id('newProjectName'));
  }

  getSaveButton() {
    return element(by.id('createProject'));
  }


}
