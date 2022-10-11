//initial state
const initialState = {
    counterList : [{
        id  : 0,
        value : 0,
        modifyBy : 1
    }]
};

//action identifiers
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const ADDCOUNTER = 'counter/addcounter';
const RESETCOUNTER = 'counter/resetcounter';
const REMOVECOUNTER = 'counter/removecounter';
const CLEARCOUNTER = 'counter/clearcounter';
const CHANGEVALUE = 'counter/changecounter';

//action creators
const increment = (index) => {
    return {
        type: INCREMENT,
        payload: {
            index : index
        }
    }
}

const decrement = (index) => {
    return {
        type: DECREMENT,
        payload: {
            index : index
        }
    }
}

const addCounter = (index) => {
    return {
        type: ADDCOUNTER,
        payload: {
            index : index,
        }
    }
}

const resetCounter = () => {
    return {
        type: RESETCOUNTER,
    }
}

const clearCounter = (index) => {
    return {
        type: CLEARCOUNTER,
        payload: {
            index : index,
        }
    }
}

const changeCounter = (index,value) => {
    return {
        type: CHANGEVALUE,
        payload: {
            index : index,
            value : value
        }
    }
}

const removeCounter = (index) => {
    return {
        type: REMOVECOUNTER,
        payload: {
            index : index,
        }
    }
}

//create reducer function
function counterReducer(state = initialState , action) {
    
    let copy = {...state, counterList : [...state.counterList]}

    switch (action.type) {

        case INCREMENT : 
            copy.counterList.map((value,key) => {
                if (value.id === action.payload.index ) {
                    copy.counterList[key] = {...copy.counterList[key] , value : copy.counterList[key].value + copy.counterList[key].modifyBy}
                }
                return copy.counterList;
            })
            return copy;

        case DECREMENT :
            copy.counterList.map((value,key) => {
                if (value.id === action.payload.index ) {
                    copy.counterList[key] = {...copy.counterList[key] , value : copy.counterList[key].value - copy.counterList[key].modifyBy}
                }
                return copy.counterList;
            })
            return copy;

        case ADDCOUNTER :
            copy.counterList = [...copy.counterList , { id : action.payload.index , value : 0 , modifyBy : action.payload.index+1 } ]
            return copy;

        case RESETCOUNTER : 
            copy.counterList.map((value,key) => {
                copy.counterList[key] = {...copy.counterList[key] , value : 0};
                return copy.counterList[key];
            })
            return copy;

        case REMOVECOUNTER :
            copy.counterList = copy.counterList.filter((value,key) => {
                return value.id !== action.payload.index
              })
              return copy;

        case CLEARCOUNTER :  
            copy.counterList[action.payload.index] = {...copy.counterList[action.payload.index] , value : 0};
            return copy;

        case CHANGEVALUE :
            copy.counterList[action.payload.index] = {...copy.counterList[action.payload.index] , modifyBy : action.payload.value};
            return copy;

        default :
            return state;
    }
} 

let i=0;

const counterDivEl = (val) =>  `
    <div id="addNewCounterEl${val}">
        <div class="h-auto flex flex-col items-end justify-center px-1 py-1">
            <div class="h-auto flex flex-col items-end justify-center ">
                <div class="flex space-x-3">
                    <button id="removeCounterEl${val}" class="bg-red-900 text-white px-3 py-2 rounded shadow">
                        - Remove Counter ${val+1}
                    </button>
                </div>
            </div>
        </div>
        <div class="p-3 h-auto flex flex-col items-center justify-center space-y-2 bg-white rounded shadow">
            <span class="font-bold text-violet-900">Counter ${val+1}</span>
            <div class="relative">
                <input id="modifiedEl${val}" type="number" id="floating_outlined" value="${val+1}" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  min="1" oninput="if(this.value<1) this.value = 1" />
                <label for="floating_outlined" class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Increment/Decrement By </label>
            </div>
            <div id="counterEl${val}" class="text-2xl font-semibold text-rose-900"></div>
            
            <div class="flex space-x-3">
                <button id="incrementEl${val}" name="${val}" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
                    Increment (+)
                </button>

                <button id="decrementEl${val}" name="${val}" class="bg-red-400 text-white px-3 py-2 rounded shadow">
                    Decrement (-)
                </button>
                <button id="clearCounterEl${val}" class="bg-yellow-500 text-white px-3 py-2 rounded shadow">
                    Clear
                </button>
            </div>
        </div>
    </div>    
`;
//Satic Event 
const addAnotherCounterEl = document.getElementById("addAnotherCounter");
const resetCounterEl = document.getElementById("resetCounter");
const dashboardEl = document.getElementById("dashboard");
const activeCounterEl = document.getElementById("activeCounter");

// create store
const store = Redux.createStore(counterReducer);

//grand total
const grandTotal = (countElements) => {
   return countElements.reduce((total,curr) => total + curr.value,0)
}

const render = () => {
    const state = store.getState();

    state.counterList.map((val, key) => {
        document.getElementById("counterEl"+val.id).innerText = val.value;
    })

    dashboardEl.innerText = grandTotal(state.counterList);
    activeCounterEl.innerText = state.counterList.length;
    
};

// update UI initially
render();

store.subscribe(render);

//static event listener 1st counter
document.getElementById("incrementEl0").addEventListener("click", () => {
    store.dispatch(increment(0));
});

document.getElementById("decrementEl0").addEventListener("click", () => {
    store.dispatch(decrement(0));
});

document.getElementById("clearCounterEl0").addEventListener("click", () => {
    store.dispatch(clearCounter(0));
});

document.getElementById("modifiedEl0").addEventListener("change", (e) => {
    let value = parseInt(e.target.value);
    store.dispatch(changeCounter(0,value));
});

//dynamic event listener for adding every new counter element

addAnotherCounterEl.addEventListener("click", () => {
    let prevState = store.getState().counterList;
    let prevStateLength =  store.getState().counterList.length - 1 ;
    let id = prevState[prevStateLength].id;
    i = id + 1;

    // add element into last child
    document.getElementById("newCounter").insertAdjacentHTML('beforeend',counterDivEl(i));

    //dynamic event listener for newly added counter
    document.getElementById("incrementEl"+i).addEventListener("click", (e) => {
        let key = parseInt(e.target.id.split('El')[1]);
        store.dispatch(increment(key));
    });
    
    document.getElementById("decrementEl"+i).addEventListener("click", (e) => {
        let key = parseInt(e.target.id.split('El')[1]);
        store.dispatch(decrement(key));
    });
    
    document.getElementById("removeCounterEl"+i).addEventListener("click", (e) => {
        let key = parseInt(e.target.id.split('El')[1]);
        store.dispatch(removeCounter(key));
        let removeEl = document.getElementById("addNewCounterEl"+key);
        removeEl.remove();
    });

    document.getElementById("clearCounterEl" + i).addEventListener("click", (e) => {
        let key = parseInt(e.target.id.split('El')[1]);
        store.dispatch(clearCounter(key));
    });

    document.getElementById("modifiedEl" + i).addEventListener("change", (e) => {
        let value = parseInt(e.target.value);
        let key = parseInt(e.target.id.split('El')[1]);
        store.dispatch(changeCounter(key,value));
    });

    store.dispatch(addCounter(i));
});

resetCounterEl.addEventListener("click", () => {
    store.dispatch(resetCounter());
});