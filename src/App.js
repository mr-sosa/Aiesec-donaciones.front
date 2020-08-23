import React from 'react';
import './App.css';

const ENDPOINT = "http://localhost:2000/CreateDonationLink";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      form:{
        amount: {value: ""}
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  async generarDonacion(val){
    let valor = 0;
    if(val === 0){
      valor = this.state.form.amount.value;
    } else{
      valor = val.target.value;
    }
    
    let donation = await fetch(ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Amount: valor
      })
    });
    
    if(!(parseInt(donation.status) === 500 || parseInt(donation.status) === 403 || parseInt(donation.status) === 401)){
      donation = await donation.json();
      let urlPayU = donation.respuesta;
      window.top.location.href = urlPayU;
      console.log(urlPayU);
    }
    
  }

  async onSubmit(event){
    event.preventDefault();
    this.generarDonacion(0);
  }

  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      form: {
        ...this.state.form,
        [name]: {
        ...this.state.form[name],
          value
        }
      }
    });
  }

  // <span className="badge badge-primary">By MR Sosa</span>
  render(){
    return(
      <div className="container">
        <h1>Dona Seguro por PayU </h1>
        <div className="col shadow p-3">
          <div className="col align-self-center">
            <div className="row">
              <h5>¿Cómo te gustaría hacer tu donación?</h5><br/>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <button onClick={this.generarDonacion} value="20000" type="button" className="btn btn-outline-primary">$20.000</button>
              </div>
              <div className="col">
                <button onClick={this.generarDonacion} value="50000" type="button" className="btn btn-outline-primary">$50.000</button>
              </div>
              <div className="col">
                <button onClick={this.generarDonacion} value="100000" type="button" className="btn btn-outline-primary">$100.000</button>
              </div>
              <div className="col-sm-auto">
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <label className=""><span className="text-muted">Otro monto (COL$) : </span></label>
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <input onChange={this.handleChange} type="number" min="20000" className="form-control" name="amount"/>
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-outline-primary">Donar</button>
                      </div>
                    </div>
                  </div>      
                </form>
              </div>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
