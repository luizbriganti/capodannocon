import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import SweetAlert from 'react-bootstrap-sweetalert';
import Sorter from './Sorter';

class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    //this.pattern = /[a-zA-Z0-9][a-zA-Z0-9'\- ][\$\uFFE5\^\+=`~<>{}\[\]|\u3000-\u303F!-#%-\x2A,-/:;\x3F@\x5B-\x5D_\x7B}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/g

    //this.pattern = /^[a-zA-Z0-9][a-zA-Z0-9'\- ]+$/;
    //this.emptyPattern = /^\s*$/;
    this.state = {
      value: '',
      pristine: true, 
      dirty: false, 
      valid: false,
      showForm: false,
      title: '',
      description: '',
      event: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const {event_title, event_description, event_img, event_subs_min, event_subs_max, event_date, event_slot} = e.target 

    const values = {
      title: event_title.value, 
      description: event_description.value, 
      image: event_img.value,
      min: event_subs_min.value,
      max: event_subs_max.value,
      date: event_date.value, 
      slot: event_slot.value
    }

    this.props.onSubmit({values, error: false});
    this.setState({dirty: false, valid: false, showForm: false, event: true, title: false, description: false});
  }

  render() {

    const {showForm, event} = this.state

    return (
      <>
        <div className="list-actions">
          <button type="button" onClick={() => this.setState({showForm: !showForm})} className="btn btn-primary add-event">Aggiungi evento</button>
          <Sorter filter={this.props.filter} />
        </div>

        {
          showForm ?
          <div className="popup">
            <button type="button" className="btn btn-danger close-form" onClick={() => this.setState({showForm: !showForm, title: '', description: ''})}>
              <Icon 
                path={mdiClose} 
                size="20px"
              />
            </button>
            <form onSubmit={this.handleSubmit} className="event-form">
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="event_title"><strong>Nome evento</strong></label>
                  <input type="text" id="event_title" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="event_description"><strong>Descrizione evento</strong></label>
                  <textarea type="text" id="event_description" ></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="event_img"><strong>Immagine (incolla un url immagine)</strong></label>
                  <input type="text" id="event_img" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col half">
                  <label htmlFor="event_subs_min"><strong>Numero partecipanti minimi</strong></label>
                  <input type="number" id="event_subs_min" required />
                </div>
                <div className="form-col half">
                  <label htmlFor="event_subs_max"><strong>Numero partecipanti massimi</strong></label>
                  <input type="number" id="event_subs_max" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="event_date"><strong>Data</strong></label>
                  <select id="event_date" required onChange={event => event.target.value}>
                    <option value="null">Seleziona una</option>
                    <option value="2021-12-29">29 Dicembre</option>
                    <option value="2021-12-30">30 Dicembre</option>
                    <option value="2021-12-31">31 Dicembre</option>
                    <option value="2022-01-01">1 Gennaio</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="event_slot"><strong>Slot</strong></label>
                  <select id="event_slot" required onChange={event => event.target.value}>
                    <option value="null">Seleziona uno</option>
                    <option value="diurno">Diurno (10-15)</option>
                    <option value="pomeridiano">Pomeridiano (15-20)</option>
                    <option value="serale">Serale (21 in poi)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Aggiungi evento</button>
            </form>
          </div>
          : ''
        }
        <SweetAlert
            show={event}
            showConfirm
            confirmBtnText="Ok"
            title="Successo!"
            onConfirm={() => this.setState({event: !event})}         
        >
            <p>L'evento è stato aggiunto con successo!</p>
        </SweetAlert>
      </>
    );
  }
}

export default Form;