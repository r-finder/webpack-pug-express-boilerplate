import tmpl from '../templates/datatable.pug';

class App {
  static init() {}

  static run() {
    this.fetchData();
  }

  //example of fetching some backend data and feeding it to a client-side template
  static fetchData() {
    const selector = '.dataTable';
    const url = '/getSampleData';

    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const dtElement = document.querySelector(selector);
        dtElement.innerHTML = tmpl({ data: data });
      })
      .catch((error) => {
        console.error('Unable to fetch data:', error);
      });
  }
}

App.init();
App.run();

window.App = App;
