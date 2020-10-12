import React, { Component } from 'react';
import axios from 'axios';
import './air-quality.css';
import Config from '../Config';
const conf = new Config();

class AirQuality extends Component {
    state = {
        city: "Bangalore",
        aqi: {},
        condition: {
            color: null,
            level: null,
            healthImplication: null,
            CautionaryStatement: null
        }
    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://api.waqi.info/feed/' + this.state.city + "/?token=" + conf.token
        }).then((resp) => {
            this.setState({
                aqi: resp.data.data,
                condition: this.getColor(resp.data.data.aqi)
            });

        })
    }

    getColor(aqi) {
        let classObj = {
            color: null,
            level: null,
            healthImplication: null,
            CautionaryStatement: null
        };
        if (aqi >= 0 && aqi <= 50) {
            return {
                color: "#009966",
                level: "Good",
                healthImplication: "Air quality is considered satisfactory, and air pollution poses little or no risk",
                CautionaryStatement: null
            }
        } else if (aqi > 50 && aqi < 100) {
            return {
                color: "#FFDE33",
                level: "Moderate",
                healthImplication: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
            }
        } else if (aqi > 100 && aqi <= 150) {
            return {
                color: "#FF9933",
                level: "Unhealthy for Sensitive Groups",
                healthImplication: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
            }
        }
        else if (aqi > 150 && aqi <= 200) {
            return {
                color: "#CC0033",
                level: "Unhealthy",
                healthImplication: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
            }
        } else if (aqi > 200 && aqi <= 300) {
            return {
                color: "#660099",
                level: "Very Unhealthy",
                healthImplication: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
            }
        } else if (aqi > 300) {
            return {
                color: "#7E0023",
                level: "Hazardous",
                healthImplication: "Health alert: everyone may experience more serious health effects",
                CautionaryStatement: "Everyone should avoid all outdoor exertion"
            }
        }
        return classObj
    }

    render = () => {
        return (
            <section className={"container-fluid air-quality"} style={{ background: this.state.condition.color }}>
                <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" style={{ float: "left" }}>
                    <h3>{this.state.city}</h3>
                    <h5 className="text-muted">{this.state.aqi.aqi} / {this.state.condition.level}</h5>
                    <hr />
                    <h6>Health Implication</h6>
                    <p>
                        {this.state.condition.healthImplication}
                    </p>
                    <h6>Cautionary Statement</h6>
                    <p>
                        {this.state.condition.CautionaryStatement}
                    </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12" style={{ float: "left" }}>
                    <table class="table">


                        {/* <tbody>
                            {this.state.aqi.iaqi.map((gas,index)=>
                            <tr>
                                <td>{gas}</td>
                                <td>Otto</td>
                            </tr>
                            )}
                        </tbody> */}
                    </table>
                </div>
            </section>
        )
    }
}

export default AirQuality;