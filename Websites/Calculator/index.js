const { useState, useEffect, useCallback } = React;

let calculator_Keys = {
  clear: {
    keyPressed: "Escape",
    id: "clear",
    display: "",
    clearsDisplay: true,
    operator: false,
    operand: false,
  },
  divide: {
    keyPressed: "/",
    id: "divide",
    display: "/",
    clearsDisplay: true,
    operator: true,
    operand: false,
  },
  multiply: {
    keyPressed: "*",
    id: "multiply",
    display: "*",
    clearsDisplay: true,
    operator: true,
    operand: false,
  },
  subtract: {
    keyPressed: "-",
    id: "subtract",
    display: "-",
    clearsDisplay: true,
    operator: true,
    operand: false,
  },
  add: {
    keyPressed: "+",
    id: "add",
    display: "+",
    clearsDisplay: true,
    operator: true,
    operand: false,
  },
  equals: {
    keyPressed: "Enter",
    keyPressedAlt: "=",
    id: "equals",
    display: "=",
    clearsDisplay: true,
    operator: true,
    operand: false,
  },
  decimal: {
    keyPressed: ".",
    id: "decimal",
    display: ".",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  zero: {
    keyPressed: "0",
    id: "zero",
    display: "0",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  one: {
    keyPressed: "1",
    id: "one",
    display: "1",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  two: {
    keyPressed: "2",
    id: "two",
    display: "2",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  three: {
    keyPressed: "3",
    id: "three",
    display: "3",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  four: {
    keyPressed: "4",
    id: "four",
    display: "4",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  five: {
    keyPressed: "5",
    id: "five",
    display: "5",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  six: {
    keyPressed: "6",
    id: "six",
    display: "6",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  seven: {
    keyPressed: "7",
    id: "seven",
    display: "7",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  eight: {
    keyPressed: "8",
    id: "eight",
    display: "8",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
  nine: {
    keyPressed: "9",
    id: "nine",
    display: "9",
    clearsDisplay: false,
    operator: false,
    operand: true,
  },
};

let calculator_Keys_ID = {};
for (let key in calculator_Keys) {
  calculator_Keys_ID[calculator_Keys[key]["keyPressed"]] = key;

  if (calculator_Keys[key]["keyPressedAlt"]) {
    calculator_Keys_ID[calculator_Keys[key]["keyPressedAlt"]] = key;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Variables
let equation = "";
let newOperand = "";
let newOperator = "";
let result = "";
let lastKeyPressed = "";

/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Functional Components
ReactDOM.render(<App />, document.getElementById("root"));

function App() {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //React hooks for display
  let [displayEquationDOM, setdisplayEquationDOM] = useState("0");
  let [displayResultOperDOM, setdisplayResultOperDOM] = useState("0");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Functions

  // Calculate
  async function calculate(e) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Edge Cases
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Check last key pressed:
    //After pressing "Enter" or "=" to solve an equation: typing operator should use last result as start of equation
    //After pressing "Enter" or "=" to solve an equation: typing number should clear equation
    //After pressing "Enter" or "=" after pressing "Enter" or "=": clear equation
    if (
      (/[0123456789.]/.test(e.key) || e.key === "Enter" || e.key === "=") &&
      (lastKeyPressed === "Enter" || lastKeyPressed === "=")
    ) {
      equation = "";
    }

    //Check if operand begins with a decimal, change decimal to "0."
    if (newOperand.startsWith(".")) {
      newOperand = "0" + newOperand;
    }

    //Check if operand is "0."" and operator was pressed, change operand to "0"
    if (/[/*\-+=]/.test(e.key) || e.key === "Enter" || e.key === "=") {
      if (newOperand === "0.") {
        newOperand = "0";
      }
    }

    //Check if number begins with multiple zeros.
    if (e.key === "0") {
      if (newOperand === "0") {
        return;
      }
    }

    //Check if number will begin with a leading zero (0123...)
    if (/[123456789]/.test(e.key)) {
      if (newOperand === "0") {
        newOperand = "";
      }
    }

    //Check if equation or number will begin with an operator
    if (/[/*+]/.test(e.key)) {
      if (equation === "" && newOperand === "") {
        return;
      }
    }

    //Check if equation or number will begin with "--"
    if (/[\-]/.test(e.key) && equation === "" && newOperator === "-") {
      return;
    }

    //Check if equation is dviding by 0
    if (/[/*\-+=]/.test(e.key) || e.key === "Enter") {
      if (
        (newOperand === "0" || newOperand === "0." || newOperand === ".") &&
        equation.endsWith("/")
      ) {
        //temporary display
        await displayResultOper("CANNOT DIVIDE BY 0");
        // this code will wait for 1 seconds
        await new Promise((r) => setTimeout(r, 1000));
        // this code will run after 1 seconds
        await displayEquation(equation);
        await displayResultOper(newOperand);
        return;
      }
    }

    // Check if equation is valid
    // After pressing "Enter", next input have to be an operator to be a valid equation
    if (/[123456789.]/.test(e.key) && equation !== "" && newOperator === "") {
      if (/[123456789.]/.test(equation.toString().slice(-1))) {
        return;
      }
    }

    //Check if number of decimals is valid
    if (e.key === ".") {
      if ((newOperand.match(/[.]/g) || []).length >= 1) {
        return;
      }
    }

    //Check length of displayed (23 characters limit)
    if (/[0123456789.]/.test(e.key) && newOperand.length < 23) {
    } else if (/[0123456789.]/.test(e.key) && newOperand.length >= 23) {
      //temporary display
      await displayResultOper("Digit Limit Met");
      // this code will wait for 1 seconds
      await new Promise((r) => setTimeout(r, 1000));
      // this code will run after 1 seconds
      await displayEquation(equation);
      await displayResultOper(newOperand);
      return;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Calculator
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //AC (Clear) / [Key(s) Pressed: Escape] /
    if (e.key === "Escape") {
      //Clear variables
      equation = "";
      newOperand = "";
      newOperator = "";
      result = "";

      //Display cleared screen
      await displayEquation("0");
      await displayResultOper("0");

      //Last key pressed
      lastKeyPressed = e.key;

      return;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Store and display / [Key(s) Pressed: /*-+=] /
    if (/[/*\-+=]/.test(e.key)) {
      //Store operand to equation
      equation += newOperand.toString();

      //If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).
      if (newOperator.length >= 2) {
        newOperator = e.key;
      } else if (
        /[/*+=]/.test(e.key) &&
        /[/*+=]/.test(newOperator.toString().slice(-1)) &&
        newOperator.length === 1
      ) {
        newOperator = e.key;
      } else if (
        /[/*+=]/.test(e.key) &&
        /[\-]/.test(newOperator.toString().slice(-1)) &&
        newOperator.length === 1
      ) {
        newOperator = e.key;
      } else if (/[/*\-+=]/.test(e.key) && newOperator.endsWith("--")) {
        return;
      } else {
        newOperator += e.key;
      }
      //Display
      await displayEquation(equation);
      await displayResultOper(newOperator);

      //Clear variables
      newOperand = "";
      lastKeyPressed = e.key;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Store and display / [Key(s) Pressed: 0123456789.] /
    if (/[0123456789.]/.test(e.key)) {
      //Store operator to equation and new operand
      equation += newOperator.toString();
      newOperand += e.key;

      //Display
      await displayEquation(equation);
      await displayResultOper(newOperand);

      //Clear variables
      newOperator = "";
      lastKeyPressed = e.key;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Solve equation and display / [Key(s) Pressed: "=", "Enter"] /
    if (e.key === "Enter" || e.key === "=") {
      //if there isn't an equation, return
      if (equation === "") {
        //Display calculated value
        await displayEquation(equation);
        await displayResultOper(newOperand);

        //Clear and store variables
        equation = "";
        newOperand = "";
        newOperator = "";
        lastKeyPressed = e.key;
        return;
      }

      //if no new operand, trim last operator
      //if new operand, add to equation
      if (newOperand === "") {
        //Check if equation ends with an operator
        if (/[/*\-+=]/.test(equation.toString().slice(-1))) {
          equation = equation.toString().slice(0, equation.length - 1);
        }
      } else if (newOperand !== "") {
        //Store equation with new operand
        equation += newOperand.toString();
      }

      //Solve stored equation
      //eval() can't evaluate "--" or "++". Replace "--" operators with "+" on equation.
      result = eval(equation.replace(/[-]{2}|[+]{2}/g, "+"));

      //Display result
      if (result === Infinity || result === -Infinity) {
        //temporary display
        await displayResultOper("CALCULATED VALUE MAXED");
        // this code will wait for 1 seconds
        await new Promise((r) => setTimeout(r, 1000));
        // this code will run after 1 seconds
        equation = equation.substring(0, equation.length - newOperand.length); // removes last operand from equation

        //Display calculated value
        await displayEquation(equation);
        await displayResultOper(newOperand);

        //Clear and store variables
        newOperator = "";
        lastKeyPressed = e.key;
      } else if (result.length > 23) {
        let stringResult = parseFloat(result).toExponential().toString();

        let substringPower = stringResult.substring(stringResult.indexOf("e"));
        let substringNumber = stringResult.substring(
          0,
          23 - substringPower.length
        );

        result = substringNumber + substringPower;

        //Display calculated value
        await displayEquation(equation);
        await displayResultOper(result);

        //Clear and store variables
        equation = result;
        newOperand = "";
        newOperator = "";
        lastKeyPressed = e.key;
      } else {
        //Display calculated value
        await displayEquation(equation);
        await displayResultOper(result);

        //Clear and store variables
        equation = result;
        newOperand = "";
        newOperator = "";
        lastKeyPressed = e.key;
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Delete / [Key(s) Pressed: Backspace] /
    if (e.key === "Backspace" && newOperand.length >= 1) {
      //Store equation and new operand
      newOperand = newOperand.slice(0, newOperand.length - 1);

      //Display new value
      await displayEquation(equation);
      await displayResultOper(newOperand);

      //Last key pressed
      lastKeyPressed = e.key;
    } else if (e.key === "Backspace" && newOperator.length >= 1) {
      //Store equation and new operator
      newOperator = newOperator.slice(0, newOperator.length - 1);

      //Display new value
      await displayEquation(equation);
      await displayResultOper(newOperator);

      //Last key pressed
      lastKeyPressed = e.key;
    }
  }

  // Display
  async function displayEquation(equation) {
    //Set state for displayEquationDOM
    setdisplayEquationDOM(equation);
    console.log(equation); //
  }
  async function displayResultOper(result_oper) {
    //Set state for dispalyResultOperDOM
    setdisplayResultOperDOM(result_oper.toString());
    console.log(result_oper.toString()); //
  }

  //Eventhandler function (keydown eventhandler) (window.document)
  //Using the 'useCallback' react hook to memoize function (caching the function definition between re-renders).
  const keyDown = useCallback(
    (e) => {
      //Sequential key presses seems to trigger additional entries after each entry ?
      //react eventlistener multiplying on each rerender
      // if cause was due to bubbling (default browswer behavior) or capturing, set 'e.stopImmediatePropagation()' or 'e.stopPropogation()'.
      // e.stopImmediatePropagation();

      if (e.repeat) {
        return;
      }

      if (
        (/[0123456789./*\-+=]/.test(e.key) && !/[F]/.test(e.key)) ||
        e.key === "Enter" ||
        e.key === "Escape" ||
        e.key === "Backspace"
      ) {
        //Solution 1
        //Key press --> calculate --> display
        calculate(e);

        //Solution 2
        // // (keypress --> click --> calculate --> display) but for some reason the dispatch isn't triggering the click event
        // // keypress dispatch click event at elementID with optional additional property of 'id' (e.detail.id)
        // console.log("keydown:");
        // console.log(e.key, calculator_Keys_ID[e.key]);
        // console.log("dispatch newevent: ");
        // console.log(e);

        // let clickElement = document.getElementById(calculator_Keys_ID[e.key]);
        // setTimeout(() => clickElement.dispatchEvent(new CustomEvent("click")));

        // console.log(
        //   "click event dispatched to: ",
        //   document.getElementById(calculator_Keys_ID[e.key])
        // );

        // // let newEvent = new CustomEvent("click");
        // // setTimeout(() =>
        // //   document
        // //     .getElementById(calculator_Keys_ID[e.key])
        // //     .dispatchEvent(newEvent)
        // // );

        // // setTimeout(() =>
        // //   menu.dispatchEvent(
        // //     new CustomEvent("menu-open", {
        // //       bubbles: true,
        // //     })
        // //   )
        // // );
      }
    },
    [calculate()]
  );

  //Eventhandler function (click eventhandler) (Buttons Component elements onClick)
  const calculatorKey = useCallback((e) => {
    console.log("event object from calculatorKey(e)/onClick:");
    console.log(e);
    if (e.type === "keydown") {
      console.log("onKeyDown: " + e.key);
    } else if (e.type === "click") {
      //Add keypress to e
      e.key = calculator_Keys[e.target.id]["keyPressed"];

      calculate(e);
    }
    console.log("click event: ");
    console.log(e);
    console.log(document.getElementById(e.target.id));
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Eventhandlers
  //e passed from keypress and click are different. Add 'element id' to 'keypress' events and 'key pressed' to 'click' events.
  //Eventhandlers (keydown) (window.document)
  //Eventhandlers (click) (Buttons Component Elements)

  //Eventhandlers (keypress)
  useEffect(() => {
    //subscribe and unsubscribe eventhandler on each render to prevent multiplying eventhandler on each rerender
    //https://stackoverflow.com/questions/64434545/react-keydown-event-listener-is-being-called-multiple-times

    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [keyDown]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <ComponentCalculator
        displayEquationDOM={displayEquationDOM}
        displayResultOperDOM={displayResultOperDOM}
        calculatorKey={calculatorKey}
      />
      <ComponentWebDeveloper />
    </div>
  );
}

function ComponentCalculator(props) {
  let displayEquationDOM = props.displayEquationDOM;
  let displayResultOperDOM = props.displayResultOperDOM;
  let calculatorKey = props.calculatorKey;

  return (
    <section id="calculator">
      <ComponentDisplay
        displayEquationDOM={displayEquationDOM}
        displayResultOperDOM={displayResultOperDOM}
      />
      <ComponentButtons calculatorKey={calculatorKey} />
    </section>
  );
}

function ComponentDisplay({ displayEquationDOM, displayResultOperDOM }) {
  return (
    <section id="displays" className="col">
      <div id="calculatorDisplayEquation" className="row">
        <span>{displayEquationDOM}</span>
      </div>
      <div id="display" className="row">
        <span>{displayResultOperDOM}</span>
      </div>
    </section>
  );
}

function ComponentButtons({ calculatorKey }) {
  return (
    <section id="buttons">
      <div className="row">
        <button
          id="clear"
          className="col-6 btn bg-danger button button-red"
          onClick={(e) => calculatorKey(e)}
        >
          AC
        </button>
        <button
          id="divide"
          className="col-3 btn bg-secondary button button-light-gray"
          onClick={(e) => calculatorKey(e)}
        >
          /
        </button>
        <button
          id="multiply"
          className="col-3 btn bg-secondary button button-light-gray"
          onClick={(e) => calculatorKey(e)}
        >
          x
        </button>
      </div>
      <div className="row">
        <button
          id="seven"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          7
        </button>
        <button
          id="eight"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          8
        </button>
        <button
          id="nine"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          9
        </button>
        <button
          id="subtract"
          className="col-3 btn bg-secondary button button-light-gray"
          onClick={(e) => calculatorKey(e)}
        >
          -
        </button>
      </div>
      <div className="row">
        <button
          id="four"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          4
        </button>
        <button
          id="five"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          5
        </button>
        <button
          id="six"
          className="col-3 btn button button-gray"
          onClick={(e) => calculatorKey(e)}
        >
          6
        </button>
        <button
          id="add"
          className="col-3 btn bg-secondary button button-light-gray"
          onClick={(e) => calculatorKey(e)}
        >
          +
        </button>
      </div>

      <div className="row">
        <div className="col-9">
          <div className="row">
            <button
              id="one"
              className="col-4 btn button button-gray"
              onClick={(e) => calculatorKey(e)}
            >
              1
            </button>
            <button
              id="two"
              className="col-4 btn button button-gray"
              onClick={(e) => calculatorKey(e)}
            >
              2
            </button>
            <button
              id="three"
              className="col-4 btn button button-gray"
              onClick={(e) => calculatorKey(e)}
            >
              3
            </button>
          </div>
          <div className="row">
            <button
              id="zero"
              className="col-8 btn button button-gray"
              onClick={(e) => calculatorKey(e)}
            >
              0
            </button>
            <button
              id="decimal"
              className="col-4 btn button button-gray"
              onClick={(e) => calculatorKey(e)}
            >
              .
            </button>
          </div>
        </div>

        <button
          id="equals"
          className="col-3 btn bg-primary button button-blue"
          onClick={(e) => calculatorKey(e)}
        >
          =
        </button>
      </div>
    </section>
  );
}

function ComponentWebDeveloper() {
  return (
    <section id="web-developer">
      by{" "}
      <a class="links" href="https://codepen.io/hc-app/">
        Henry Chen
      </a>
    </section>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Component didn't render elements before eventhandlers with getElementById inside components so eventhandlers could not be created.
//import { useState } from "react"; import react, { useState } from "react"; // isn't importing useState

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Store
// let state = {
//   equation: "",
//   newOperand: "",
//   newOperator: "",
//   result: "",
//   calculatorDisplayEquation: "",
//   calculatorDisplayResultOper: "",
// };

// //Actions

// // Components
// // class ComponentDisplayEquation extends React.Component {
// //   state = {
// //     displayEquation: calculatorDisplayEquation,
// //   };
// //      this.setState({
// // displayEquation: calculatorDisplayEquation
// //   });
// //   render() {
// //     return (
// //       <div>
// //         <p>{this.state.displayEquation}</p>
// //       </div>
// //     );
// //   }
// // }

// // class ComponentDisplay extends React.Component {
// //   state = {
// //     displayResultOper: calculatorDisplayResultOper
// //   };
// //      this.setState({
// // displayResultOper: calculatorDisplayResultOper
// //   });
// //   render() {
// //     return (
// //       <div>
// //         <p>{this.state.displayResultOper}</p>
// //       </div>
// //     );
// //   }
// // }

// ReactDOM.render(
//   <ComponentDisplayEquation />,
//   document.getElementById("calculatorDisplayEquation")
// );
// ReactDOM.render(
//   <ComponentDisplay />,
//   document.getElementById("calculatorDisplayResultOper")
// );

// //////////////////////////////////////////////////////////////////////////////////////////////////
// //Class Components
// //////////////////////////////////////////////////////////////////////////////////////////////////
// class ComponentDisplay extends React.Component {
//   // state = {
//   //   displayEquation: calculatorDisplayEquation,
//   //   displayResultOper: calculatorDisplayResultOper,
//   // };

//   constructor(e) {
//     super(e),
//       (this.state = { a: "" }),
//       (this.displayResultOper = this.displayResultOper.bind(this));
//   }

//   await displayResultOper() {
//     this.setState({ a: calculatorDisplayResultOper });
//   }

//   render() {
//     return (
//       <div>
//         <p onChange={calculatorDisplayResultOper}>{this.state.a}</p>
//       </div>
//     );
//   }
// }

// class ComponentCalculator extends React.Component {
//   // state = {
//   //   displayEquation: calculatorDisplayEquation,
//   //   displayResultOper: calculatorDisplayResultOper,
//   // };

//   constructor(e) {
//     super(e),
//       (this.state = { a: "" }),
//       (this.displayResultOper = this.displayResultOper.bind(this));
//   }

//   await displayResultOper() {
//     this.setState({ a: calculatorDisplayResultOper });
//   }

//   render() {
//     return (
//       <section id="calculator">
//         <ComponentDisplay />
//         <ComponentButtons />
//       </section>
//     );
//   }
// }

// class ComponentDisplay extends React.Component {
//   // state = {
//   //   displayEquation: calculatorDisplayEquation,
//   //   displayResultOper: calculatorDisplayResultOper,
//   // };

//   constructor(e) {
//     super(e),
//       (this.state = { a: "" }),
//       (this.displayResultOper = this.displayResultOper.bind(this));
//   }

//   await displayResultOper() {
//     this.setState({ a: calculatorDisplayResultOper });
//   }

//   render() {
//     return (
//       <section id="displays" className="col">
//         <div id="calculatorDisplayEquation" className="row">
//           {calculatorDisplayEquation}
//         </div>
//         <div id="calculatorDisplayResultOper" className="row">
//           {calculatorDisplayResultOper}
//         </div>
//       </section>
//     );
//   }
// }

// class ComponentButtons extends React.Component {
//   // state = {
//   //   displayEquation: calculatorDisplayEquation,
//   //   displayResultOper: calculatorDisplayResultOper,
//   // };

//   constructor(e) {
//     super(e),
//       (this.state = { a: "" }),
//       (this.displayResultOper = this.displayResultOper.bind(this));
//   }

//   await displayResultOper() {
//     this.setState({ a: calculatorDisplayResultOper });
//   }

//   render() {
//     return (
//       <section id="buttons">
//         <div className="row">
//           <button id="clear" className="col-6 bg-danger button button-red">
//             AC
//           </button>
//           <button
//             id="divide"
//             className="col-3 bg-secondary button button-light-gray"
//           >
//             /
//           </button>
//           <button
//             id="multiply"
//             className="col-3 bg-secondary button button-light-gray"
//           >
//             x
//           </button>
//         </div>
//         <div className="row">
//           <button id="seven" className="col-3 button button-gray">
//             7
//           </button>
//           <button id="eight" className="col-3 button button-gray">
//             8
//           </button>
//           <button id="nine" className="col-3 button button-gray">
//             9
//           </button>
//           <button
//             id="subtract"
//             className="col-3 bg-secondary button button-light-gray"
//           >
//             -
//           </button>
//         </div>
//         <div className="row">
//           <button id="four" className="col-3 button button-gray">
//             4
//           </button>
//           <button id="five" className="col-3 button button-gray">
//             5
//           </button>
//           <button id="six" className="col-3 button button-gray">
//             6
//           </button>
//           <button
//             id="add"
//             className="col-3 bg-secondary button button-light-gray"
//           >
//             +
//           </button>
//         </div>

//         <div className="row">
//           <div className="col-9">
//             <div className="row">
//               <button id="one" className="col-4 button button-gray">
//                 1
//               </button>
//               <button id="two" className="col-4 button button-gray">
//                 2
//               </button>
//               <button id="three" className="col-4 button button-gray">
//                 3
//               </button>
//             </div>
//             <div className="row">
//               <button id="zero" className="col-8 button button-gray">
//                 0
//               </button>
//               <button id="decimal" className="col-4 button button-gray">
//                 .
//               </button>
//             </div>
//           </div>

//           <button
//             id="equals"
//             className="col-3 bg-primary button button-blue"
//           >
//             =
//           </button>
//         </div>
//       </section>
//     );
//   }
// }

// ReactDOM.render(<ComponentCalculator />, document.getElementById("app"));

/////////////////////////////////////////////////////////////////////////////////////////////////

// class ComponentName extends React.Component {
// constructor(e) {
//   super (e),
//  this.state = {
//    a:'',
//    b:''
//  },
//   this.maxDigit = this.maxDigit.bind(this),
// }
// maxDigit() {
//   this.setState({
//     a: 'Digit Limit Met',
//     b: this.state.b
//   }),
//   setTimeout((() => this.setState({
//     a: this.state.b
//   })), 1000)
// }

//   render() {

//     return (

//     )
//   }
// }

// ReactDOM.render(<ComponentName />, document.getElementById("elementName"));

//////////////////////////////////////////////////////////////////////////////////////////////////

// e.detail from keypress to click
