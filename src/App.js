import React, { useState, useEffect } from 'react';

import './App.css';

import Grid from './components/Grid';

export const texts = React.createContext();
export const endparam = React.createContext();
export const wallcontext = React.createContext();
export const weightcontext = React.createContext();


function App() {

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const initAction = {
    start : false,
    end : false,
    wall : false,
    weight : false
  }

  let initwall = []
  
  for(let i = 0; i <= 20; ++i) {
    let row = []
    for(let j = 0; j <= 50; ++j) {
      row.push(0)
    }
    initwall.push(row)
  }
  const [Wall, setWall] = useState(initwall)

  var initweight = []
  for(let i = 0; i <= 20; ++i) {
    let row1 = []
    for(let j = 0; j <= 50; ++j) {
      row1.push(1);
    }
    initweight.push(row1)
  }

  const [weight, setweight] = useState(initweight)
  

  const [action, setaction] = useState(initAction)
  

  const initstart = {r : -1, c : -1}
  
  const [startcell, setstartcell] = useState(initstart)
  const [endcell, setendcell] = useState(initstart)

  const [speed, setspeed] = useState(20)
  const [algo, setalgo] = useState("bfs")
  
  

  async function bfs() {
    if(startcell.r === -1 || endcell.r === -1) {
      alert("Not enough parameters specified")
      return;
    }
    setaction(initAction)
    let visited = initwall
    
    let queue = [[startcell.r, startcell.c]]
    
    visited[startcell.r][startcell.c] = [-1, -1]
    
    var k = 0
    while(queue.length) {
      let v = queue[0]
      console.log(v)
      queue.shift()
      if(v[0] !== startcell.r || v[1] !== startcell.c) document.getElementById(`${v[0]}-${v[1]}`).style.backgroundColor = "aqua"
      // await sleep(100)
      var dir;
      for(dir of [[1, 0], [0, 1], [0, -1], [-1, 0]]) {
        var r = v[0] + dir[0]
        var c = v[1] + dir[1]
        
        if(r >= 0 && r <= 20 && c >= 0 && c <= 50 && !visited[r][c] && !Wall[r][c]) {
          visited[r][c] = v
         
          if(r === endcell.r && c === endcell.c) {k = 1; break;}
          document.getElementById(`${r}-${c}`).style.backgroundColor = "#24fc03"
          await sleep(speed)
          
          queue.push([r, c])
          
          // setTimeout(updateparent(v[0], v[1], r, c), 2000)
        }
        
        
      }
      if(k) break;
    }
    for(var x of queue) {
      document.getElementById(`${x[0]}-${x[1]}`).style.backgroundColor = "aqua"
    }
    if(!visited[endcell.r][endcell.c]) {
      alert("pathnot found")
      return;
    }
    let path = []
    let v = visited[endcell.r][endcell.c]
    while(visited[v[0]][v[1]][0] !== -1) {
      path.unshift(v)
      v = visited[v[0]][v[1]]
    }
    console.log(path)
    for(var y of path) {
      document.getElementById(`${y[0]}-${y[1]}`).style.backgroundColor = "yellow"
      await sleep(25)
    }

  }

  async function djikstra() {
    const INF = 1000000
    let visited = []
    console.log("wall", Wall)
    let parent = []
    let dist = []
    
    for(let i = 0; i <= 20; i++) {  
      let row2 = []
      let row3 = []
      let row4 = []
      for(let j = 0; j <= 50; ++j) {
        row2.push(INF)
        row3.push([-1, -1])
        row4.push(0)
      }
      dist.push(row2)
      parent.push(row3)
      visited.push(row4)
    }
    console.log("dist", dist)
    dist[startcell.r][startcell.c] = 0
    for(let i = 0; i < 1071; i++) {
      let v = [-1, -1]
      for(let j = 0; j <= 20; ++j) {
        for(let k = 0; k <= 50; ++k) {
          if(!visited[j][k] && dist[j][k] !== INF && (v[0] === -1 || dist[j][k] < dist[v[0]][v[1]])) {
            v = [j, k]
          }
        }
      }
      console.log(v); 
      if(v[0] === -1 || dist[v[0]][v[1]] === INF || (endcell.r === v[0] && endcell.c === v[1])) break;
      visited[v[0]][v[1]] = 1
      if(v[0] !== startcell.r || v[1] !== startcell.c)document.getElementById(`${v[0]}-${v[1]}`).style.backgroundColor = "purple"
      for(let dir of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
        let r = v[0] + dir[0]
        let c = v[1] + dir[1]
        console.log(r, c);
        if(r >= 0 && r <= 20 && c >= 0 && c <= 50 && Wall[r][c] === 0 && dist[v[0]][v[1]] + weight[r][c] < dist[r][c]) {
          if((r !== startcell.r || c!== startcell.c) && (r !== endcell.r || c !== endcell.c)) document.getElementById(`${r}-${c}`).style.backgroundColor = "violet"
          dist[r][c] = dist[v[0]][v[1]] + weight[r][c]
          parent[r][c] = v
          console.log("wall", Wall)
          await sleep(5)
        }
      }
      if(v[0] !== startcell.r || v[1] !== startcell.c)document.getElementById(`${v[0]}-${v[1]}`).style.backgroundColor = "aqua"
    }
    console.log(parent)
    if(parent[endcell.r][endcell.c][0] === -1) {
      alert("pathnot found")
      return;
    }
    let path = []
    let v = parent[endcell.r][endcell.c]
    while(parent[v[0]][v[1]][0] !== -1) {
      path.unshift(v)
      v = parent[v[0]][v[1]]
    }
    console.log(path)
    for(var y of path) {
      document.getElementById(`${y[0]}-${y[1]}`).style.backgroundColor = "yellow"
      await sleep(25)
    }
    
  }

  const startHandler = () => {
    setaction(() =>
      {
        return {...initAction,
        start : true
        }
      }
    )
    
  } 

  const endHandler = () => {
    setaction(() =>
      {
        return {...initAction,
        end : true
        }
      }
    )
    console.log(action)
  } 

  const weightHandler = () => {
    setaction(() =>
      {
        return {...initAction,
        weight : true
        }
      }
    )
  }

  const reset = () => {
    setaction(initAction)
    setstartcell(initstart)
    setendcell(initstart)
    setWall(initwall)
    setweight(initweight)
    for(var i = 0; i <= 20; ++i) {
      for(var j = 0; j <= 50; ++j) {
        document.getElementById(`${i}-${j}`).style.backgroundColor = "whitesmoke"
        document.getElementById(`${i}-${j}`).innerHTML = ""
      }
    }
  }

  const wallHandler = () => {
    setaction(
      () =>
      {
        return {
          ...initAction,
          wall : true
        }
      }
    )
  }
  const algohandler = e => {
    if(e.target.value === "bfs") {
      setweight(initweight)
      document.getElementById("walls").style.display = "none"
      for(let i = 0; i <= 20; ++i) {
        for(let j = 0; j <= 50; ++j) {
          document.getElementById(`${i}-${j}`).innerHTML = ""
        }
      }
    }
    else document.getElementById("walls").style.display = "block"
    setalgo(e.target.value)
    
  }

    useEffect(
      () => {
        console.log(action)
        
      }, [action]
    )
  
  return (
    <div className = "App">
      <div className = "algo">
        <select name = "algo" onChange = {algohandler}>
          <option value = "bfs">Breadth-First-Search</option>
          <option value = "djikstra">Djikstra</option>
        </select>
      </div>
      <div className = "speed-container">
        <button onClick = {() => setspeed(2)}>Fast</button>
        <button onClick = {() => setspeed(20)}>medium</button>
        <button onClick = {() => {setspeed(100)}}>Slow</button>
      </div>
      <div className = "button-container">
        
        <button onClick = {startHandler}>Select start cell</button>
        <button onClick = {endHandler}>Select end cell</button>
        <button onClick = {wallHandler}>Select walls</button>
        <button onClick = {weightHandler} id = "walls">Set Weight</button>
        <button onClick = {algo === "bfs" ? bfs : djikstra}>Find Shortest Path</button>
        <button onClick = {reset}>Reset</button>
      </div>
      <texts.Provider value = {[action, setaction]}>
        <endparam.Provider value = {[startcell, setstartcell, endcell, setendcell]}>
          <wallcontext.Provider value = {[Wall, setWall]}>
            <weightcontext.Provider value = {[weight, setweight]}>
              <Grid />
            </weightcontext.Provider>
          </wallcontext.Provider>
        </endparam.Provider>
      </texts.Provider>
    </div>
  );
}

export default App;
