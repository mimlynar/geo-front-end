import {ProjectsPage} from './projects.po';
import {protractor} from "protractor/built/ptor";
import {ProjectCreationPage} from "./projectCreation.po";
import {by} from "protractor";

describe('letslearn App', () => {
  let page: ProjectsPage;
  let creationPage: ProjectCreationPage;
  beforeEach(() => {
    page = new ProjectsPage();
    creationPage = new ProjectCreationPage();

  });

  it('should add new project', () => {
    page.getAddNewProjectButton().click();
    protractor.browser.sleep(3000);

    creationPage.getProjectNameInput().sendKeys('newProject');
    protractor.browser.sleep(3000);

    creationPage.getSaveButton().click();
    protractor.browser.sleep(3000);

    page.navigateTo();
    protractor.browser.sleep(3000);

    let projectList = page.getProjectList();
    projectList.all(by.id("projectName")).then(function (items) {
      expect(items[0].getText()).toBe('newProject');
    });


  });


})
