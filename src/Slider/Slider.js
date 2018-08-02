import React, { Component } from 'react';import SliderItem from './SliderItem';import './index.css';let timer = null;export default class Slider extends Component{    constructor(props){        super(props);        this.state={            nowLocal: 0,            imgData: props.imgData,        }    }    componentDidMount(){        const { nowLocal } = this.state;        const { autoPlay } = this.props;        if(autoPlay) {            this.autoPlay(nowLocal);        }    }    autoPlay = (nowLocal) => {        const { delay, imgData } = this.props;        timer = setTimeout(() => {            nowLocal++;            // const shift = imgData.shift(); // 进行数组操作            // imgData.push(shift);            if(nowLocal >= imgData.length ){                nowLocal = nowLocal - imgData.length;                // const pop = imgData.pop();                // imgData.unshift(pop);            }            this.setState({nowLocal, imgData});            this.autoPlay(nowLocal);        }, delay*1000)    };    render(){        const { speed, fadein, seamless } = this.props;        const { nowLocal, imgData } = this.state;        return (            <div                className='slider'                style={{                    height: 400,                }}>                {                    seamless ? (                            <ul style={{                                height: 400,                                left: -100 * nowLocal + "%",                                transitionDuration: speed + "s",                                width: imgData.length * 100 + "%"                            }}>                                {imgData.map((item, index) =>                                    <SliderItem                                        key={index}                                        item={item}                                        count={imgData.length}                                        nowLocal={nowLocal}                                        index={index}                                        fadein={fadein}                                        seamless={seamless}                                    />)}                            </ul>                    ) : (                        imgData.map((item, index) =>                            <SliderItem                                key={index}                                item={item}                                count={imgData.length}                                nowLocal={nowLocal}                                index={index}                                fadein={fadein}                                seamless={seamless}                            />)                    )                }            </div>        )    }}