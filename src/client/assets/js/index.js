import tmpl from '../../templates/datatable.pug';

class App {
    static init() {
    }

    static run() {
    }

    // Example filling a datatable using a precompiled client-side template (pug-plugin)
    static fillDatatable = (selector) => {
        const url = 'http://localhost:3000/getdata';
  
        fetch(url, {
          method: 'GET',
          //mode: 'no-cors',
        }).then((response) => {
          return response.json();
        }).then(data => {
          console.log('\n#### RES: ', {data});
  
            const dtElement = document.querySelector(selector);
            dtElement.innerHTML = tmpl({data: data});
  
        }).catch(error => {
          console.error('Unable to fetch data:', error);
        });
  
  
      }
}

App.init();
App.run();

window.App = App;

