import React, { useEffect, useContext , useState} from 'react'

import {texts, endparam, wallcontext, weightcontext} from '../App'
import { walldowncotext, weightdowncontext } from './Grid'

function Cell(props) {

    const [action, setaction] = useContext(texts)
    const [start, setstart, end, setend] = useContext(endparam)
    const [Wall, setWall] = useContext(wallcontext)
    const [walldown, setwalldown] = useContext(walldowncotext)
    const [weightdown, setweightdown] = useContext(weightdowncontext)
    const [weight, setweight] = useContext(weightcontext)
   
    
    var id = `${props.row}-${props.col}`

    

    const clickHandler = () => {

        
        if(action.start) {
            if(start.r !== -1){document.getElementById(`${start.r}-${start.c}`).style.backgroundColor = "whitesmoke"}
            setstart(
                {r : props.row,
                c : props.col},
                
            ) 
            document.getElementById(`${props.row}-${props.col}`).style.backgroundColor = "blue"
            if(Wall[props.row][props.col]) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 0
                    return state
                })
            }

            if(weight[props.row][props.col] === 5) {
                setweight((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 1
                    return state
                })
                document.getElementById(`${props.row}-${props.col}`).innerHTML = "" 
            }
            
            
        }
        if(action.end) {
            if(end.r !== -1) document.getElementById(`${end.r}-${end.col}`).style.backgroundColor = "whitesmoke"
            setend(
                {
                    r : props.row,
                    c : props.col
                }
            )
            document.getElementById(`${props.row}-${props.col}`).style.backgroundColor = "red"
            if(Wall[props.row][props.col]) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 0
                    return state
                })
            }
            if(weight[props.row][props.col] === 5) {
                setweight((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 1
                    return state
                })
                document.getElementById(`${props.row}-${props.col}`).innerHTML = "" 
            }
        }
        if(action.wall) {
            if(!((start.r === props.row && start.c === props.col) || (end.r === props.row && end.c === props.col) || weight[props.row][props.col] === 2) ) 

            {setWall((prevState) => {
                let state = prevState
                if(state[props.row][props.col]) {
                    state[props.row][props.col] = 0
                    document.getElementById(`${props.row}-${props.col}`).style.backgroundColor = "whitesmoke"
                }
                else {
                    state[props.row][props.col] = 1
                    document.getElementById(`${props.row}-${props.col}`).style.backgroundColor = "black"
                }
                return state
            })}
        }
        if(action.weight) {
            if(!((start.r === props.row && start.c === props.col) || (end.r === props.row && end.c === props.col) || Wall[props.row][props.col] === 1) ) 

            {setweight((prevState) => {
                let state = prevState
                if(state[props.row][props.col] === 1) {
                    state[props.row][props.col] = 5
                    document.getElementById(`${props.row}-${props.col}`).innerHTML = "<b>x5</b>"
                }
                else {
                    state[props.row][props.col] = 1
                    document.getElementById(`${props.row}-${props.col}`).innerHTML = ""
                }
                return state
            })}
        }
        console.log("Clicked", props.row, props.col)
    }
    

    const overhandler = () => {
        if(!((start.r === props.row && start.c === props.col) || (end.r === props.row && end.c === props.col)) ){
            if(walldown) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 1
                    return state
                })
                document.getElementById(`${props.row}-${props.col}`).style.backgroundColor = "black" 
            }
        }
    }
    
    return (
        <div className = "cell" 
        id = {id}
        onClick = {clickHandler} 
        onMouseDown = {() => {
            if(action.wall) {
                setwalldown(true)
            }
        }}
        onMouseOver = {overhandler}
        onMouseUp = {() => setwalldown(false)}
         >
            
        </div>
    )
}

export default Cell
