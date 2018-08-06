import React, { Component } from 'react';import SliderItem from './SliderItem';import SliderDots from './SliderDots';import './index.css';let timer = null;export default class Slider extends Component{    constructor(props){        super(props);        this.status = true;        this.state={            nowLocal: 0,            imgData: props.imgData,        }    }    componentDidMount(){        const { nowLocal } = this.state;        const { autoPlay, seamless } = this.props;        if(autoPlay && seamless) {            this.seamlessAutoPlay(nowLocal);        } else if(autoPlay){            this.autoPlay(nowLocal);        }    }    turn(n) {  //向前向后多少        const { imgData } = this.props;        const { nowLocal } = this.state;        let _nowLocal = nowLocal + n;        if(_nowLocal < 0) {            _nowLocal = _nowLocal + imgData.length;        }        if(_nowLocal >= imgData.length) {            _nowLocal = _nowLocal - imgData.length;        }        this.setState({nowLocal: _nowLocal});    }    autoPlay = (nowLocal) => {        const { delay, imgData } = this.props;        timer = setTimeout(() => {            nowLocal++;            if(nowLocal >= imgData.length ){                nowLocal = nowLocal - imgData.length;            }            this.setState({nowLocal});            this.autoPlay(nowLocal);        }, delay*1000)    };    seamlessAutoPlay = (nowLocal) => {        const { delay, imgData } = this.props;        timer = setTimeout(() => {            if(this.status){                nowLocal++;                if(nowLocal >= imgData.length ){                    nowLocal = nowLocal-2 ;                    this.status = false                }            } else {                nowLocal--;                if(nowLocal < 0 ){                    nowLocal = nowLocal+2;                    this.status = true;                }            }            this.setState({nowLocal});            this.seamlessAutoPlay(nowLocal);        }, delay*1000)    };    museOver = () => {        timer && clearTimeout(timer); // 清除自动轮播    };    mouseOut = () => { // 启动自动轮播        const { nowLocal } = this.state;        const { seamless } = this.props;        if(seamless) {            this.seamlessAutoPlay(nowLocal);        } else {            this.autoPlay(nowLocal);        }    };    goPre = (nowLocal,imgData ) => {        nowLocal--;        if(nowLocal < 0 ){            nowLocal = nowLocal+imgData.length;        }        this.setState({nowLocal});    };    goNext = (nowLocal, imgData) => {        nowLocal++;        if(nowLocal >= imgData.length){            nowLocal = nowLocal - imgData.length;        }        this.setState({nowLocal});    };    showDot = (value) => {        this.setState({            nowLocal: value        })    };    render(){        const { speed, fadein, seamless, arrows, dots } = this.props;        const { nowLocal, imgData } = this.state;        return (            <div                className='slider'                onMouseOver={this.museOver}                onMouseOut={this.mouseOut}                style={{                    height: 400,                }}>                {                    seamless ? (                            <ul style={{                                height: 400,                                left: -100 * nowLocal + "%",                                transitionDuration: speed + "s",                                width: imgData.length * 100 + "%"                            }}>                                {imgData.map((item, index) =>                                    <SliderItem                                        key={index}                                        item={item}                                        count={imgData.length}                                        nowLocal={nowLocal}                                        index={index}                                        fadein={fadein}                                        seamless={seamless}                                    />)}                            </ul>                    ) : (                        imgData.map((item, index) =>                            <SliderItem                                key={index}                                item={item}                                count={imgData.length}                                nowLocal={nowLocal}                                index={index}                                fadein={fadein}                                seamless={seamless}                            />)                    )                }                {                    (arrows === undefined || arrows &&  (seamless ?  nowLocal !== 0 : true)) && (                        <div className="pre">                            <div className="btn-icon" onClick={() => this.goPre(nowLocal, imgData)}>&lt;</div>                        </div>                    )                }                {                    (arrows === undefined || arrows &&  (seamless ?  nowLocal !== imgData.length-1 : true)) && (                        <div className="next">                            <div className="btn-icon" onClick={() => this.goNext(nowLocal, imgData)}>&gt;</div>                        </div>                    )                }                {                    (dots === undefined || dots) && (                            <SliderDots                                imgData={imgData}                                nowLocal={nowLocal}                                showDot={this.showDot}                            />                    )                }            </div>        )    }}