import React from 'react';

const ENDPOINT = "https://aieseccolombia.org:8442/CreateDonationLink";

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
        <div className="col shadow p-3">
          <div className="col align-self-center">
            <div className="row">
              <h3><font face="Lato">¿Cómo te gustaría hacer tu donación?</font></h3><br/>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <button onClick={this.generarDonacion} value="20000" type="button" className="btn btn-outline-primary"><font face="Lato" size="4">$20.000</font></button>
                </div><br/><br/>
              <div className="col">
                <button onClick={this.generarDonacion} value="50000" type="button" className="btn btn-outline-primary"><font face="Lato" size="4">$50.000</font></button>
                </div><br/><br/>
              <div className="col">
                <button onClick={this.generarDonacion} value="100000" type="button" className="btn btn-outline-primary"><font face="Lato" size="4">$100.000</font></button>
                </div><br/><br/>
              <div className="col-sm-auto">
                <form onSubmit={this.onSubmit}>
                  <div className="row"><br/>
                    <label className=""><span className="text-muted"><font face="Lato" size="3">Otro monto (COL$) : </font></span></label>
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <input onChange={this.handleChange} type="number" min="20000" className="form-control" name="amount"/>
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-outline-primary"><font face="Lato" size="3">Donar</font></button>
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
