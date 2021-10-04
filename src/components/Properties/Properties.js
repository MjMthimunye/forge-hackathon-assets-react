import React, { Component } from 'react';
import { connect } from 'react-redux';
import './properties.css';

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: new Map()
    }
    
  }

  toggleProperty(propertyIndex, evt) {
    evt.preventDefault();
    const { collapsed } = this.state;
    const isCollapsed = collapsed.get(propertyIndex);

    this.setPropertyByIndex(propertyIndex, !isCollapsed);
  }

  setPropertyByIndex(index, isCollapsed) {
    const { collapsed } = this.state;
    collapsed.set(index, true);
    this.setState({ collapsed });
  }

  componentDidMount() {
    if (this.props.properties.length === 1) {
      this.setPropertyByIndex(0, true);
    }
  }

  componentDidUpdate(prevProps) {
    const { properties } = this.props
    

    if (prevProps.properties === properties) {
      return
    }

    if (properties.length === 1) {
      this.setPropertyByIndex(0, true);
    }
  }


	render() {
    const {collapsed} = this.state;

		return(
    <div className="model-properties">
      <div>
        <button className="close-btn" onClick={this.props.onClose}><i className="fa fa-close" /></button>
        <h3>Properties</h3>

        {!this.props.properties.length
          ? <p><em>Select a part to get started</em></p>
          : null
        }
        <div>
          <div>
            {this.props.properties.map((property, i) => (
             <ul key={i}>
             <div >
                <h4 >
                  <a data-toggle="collapse" onClick={this.toggleProperty.bind(this, i)}>{property.category}</a>
                </h4>
              </div>     
                {
                  collapsed.get(i)
                    ? (
                      <div>
                        <ul>
                            {property.data.map((item, itemIndex) => (
                              <li key={itemIndex} >
                                <strong>{item.displayName}:</strong> {item.displayValue}
                              </li>
                            ))}
                        </ul>
                      </div>
                      )
                    : null
                }              
            </ul>
          ))}     
            
          </div>
        </div>
        </div>
      </div>
		)
	}
}


const PropertiesComponent = connect(
  state => ({ properties: state.properties })
)(Properties);

export default PropertiesComponent;
