let stringList: Array<string | number> = []; // generic types
let usersList: (string | number)[] = []; // regular types

// Tuples are used when we want to lock the number of elements and the type of each one of the elements an
// array has
let tupleExample: [number, string];
tupleExample = [1, "Leonardo"]; // ['Leonardo', 1] would throw an error because of the position

// You can set types to objects, locking the value types each key has
const leo: {
  name: string;
  age: number;
  height: number | string;
  hobbies: string[];
  projects: {
    name: string;
    profit: number;
  };
} = {
  name: "Leonardo",
  age: 27,
  height: 177,
  hobbies: ["going to the gym"],
  projects: {
    name: "Book Notes",
    profit: 20,
  },
};

// Using the {} as a type definition actually defines the type as "Must Not Be Null", which has nothing
// to do with with objects
// example:
let notNullConstant: {}; // to this, can be assigned any value but NULL or Undefined
// notNullConstant = null; -> this throws an error.
// notNullConstant = undefined; -> this throws an error;
notNullConstant = ["bananas", 24, true]; // this work.

//To assign an Object type to a variable, if you don't know the keys the object will have, use the Record type
// example:
let undefinedObject: Record<string, string>; // this tells typescript that undefinedObject is an object
// with undefined key-value pairs, but the keys have type string and the values have type string

// enums are only available on typescript, they're used to define a type that only allows determined options
// example
enum Role {
  Admin,
  Editor,
  Guest,
}
// let userRole: Role = Role.Admin;
// console.log(userRole) -> 0
// this came as as 0 because thats the default behavior of TS, if you want you can change to:
enum AnotherRole {
  Admin = 1,
  Editor,
  Guest,
}
// let anotherUserRole: AnotherRole = AnotherRole.Admin;
// console.log(anotherUserRole) -> 1
// this came as 1 because now the counting is set to start from 1, so every subsequent option on the enum
// will have the output changed based on that.
// there's also another alternative which consists of assigning a value to each option, but then
// you'll have to do that to each one of the options since there's no logic the compiler can follow
// example:
enum ThirdRole {
  Admin = "Admin",
  Editor = "Editor",
  Guest = "Guest",
}
// let thirdUserRole: ThirdRole = ThirdRole.Admin;
// console.log(thirdUserRole); -> Admin

// instead of using enum, you can use a Literal type, which is setting a specific value type to a variable
// example:
let specificRole: "admin"; // this is not setting a value for specificRole variable, instead, is telling
// typescript that the allowed value for specificRole is specifically the string 'admin'
// specificRole = 'guest'; -> throws an error because type "'guest'" is not assignable to type 'admin'
specificRole = "admin"; // this works.
// this becomes very usable when combining literal types with union types:
let anotherSpecificRole: "admin" | "editor"; // this tells typescritp that the value of anotherSpecificRole
// can be 'admin' or 'editor'
anotherSpecificRole = "editor"; // this works.
// you can also combine literal types with touples to make very strict options to variables value
// example:
let possibleResults: [1 | -1, number, string, ThirdRole]; // this variable is very strict and complex
// it expects 4 values, each of the values has a determined position in relation to each other,
// and each value can assume a pre-determined list of allowed values. The first value can be 1 or -1,
// the second value can be any number, the third value can be any string, and the fourth can be one
// of the options defined in the ThirdRole enum
possibleResults = [1, 35, "Leo", ThirdRole.Admin]; // this works.

// you can also create type aliases (or custom types) so you can reference them without needing to
// copy and paste the type of a variable to another variable
// example:
type TypeRole = "Admin" | "Editor" | "Guest";
// now you can reference the TypeRole type everywhere without needing to copy the values themselves.
function takeUser(user: TypeRole) {
  console.log(user);
}
// now the function parameter can take any of the values defined by the TypeRole
// you can also use type aliases when dealing with objects
// example:
type UserObjectType = {
  name: string;
  age: number;
  role: TypeRole;
};
const leoUser: UserObjectType = {
  name: "Leonardo",
  age: 27,
  role: "Admin",
};
// as you can see, this makes it easier and cleaner to use as reference.

// You can add a type of return value a function returns
// example:
function add(a: number, b: number): number {
  return a + b;
}

// the "void" type is a type that declares the return value of a function as being nothing
// example:
function log(message: string): void {
  console.log(message);
}
// this function has an output type of void because it doesn't return any value

// the "never" type
function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error(errorMessage);
}
// the return type of this function would default to "void", but we could overwrite it to "never", which means
// the function would never be able to complete it's cycle, it would never finish.
// Different than a function that doesn't return any value.
//  Because when you throw a new error like the function is doing, it just stops the function
// "runtime" let's say. And that could make your whole application crash if you don't catch
// that error somewhere else. That is very useful because if you try to store a return value for that
// function somewhere, typescript will know and warn you that the function can't return any value.
// so use the 'never' type with a function when you must ensure a return value can't be expected from it.

// The Function type is used when you pass a function as a parameter (callback) to another function or variable
// example:
function performJob(cb: Function) {
  // ...
  cb();
}
// This is pretty common, but it's not very specific.
// You can be more specific about the callback (cb) output type and the type of it's parameters by using
// the syntax "cb: (p: type) => type", where p are the parameters the cb function will expect and type is
// the type for that parameter and the type after the arrow is the type for the function output.
// example:
function performAnotherJob(cb: (message: string) => void) {
  // ...
  cb("Job done!");
}
// performAnotherJob(log);  -> Job done!
// this same concept can be used when defining methods for objects
// example:
type NewUser = {
  name: string;
  age: number;
  greet: () => string; // this defines that the greet method is a function that must return the type string
};
let newUser: NewUser = {
  name: "Leo",
  age: 27,
  greet: () => {
    // instead of using the arrow function syntax here you can also use greet() {return ...}
    return "Hello World!";
  },
};
const userGreet = newUser.greet(); // infered type string
// console.log(userGreet);  -> Hello World!

// if you need to clear the value from a variable later in your code but first you need that
// variable to hold a value, you can use the null type
// example:
let someVariable: null | string;
someVariable = "www.example.com";
someVariable = null;
// this is only possible because of the added null type used as a union type with type string.
// you can do the same with the undefined type, although they serve different purposes
// the type null is also important when dealing with the front-end via html.
// imagine you have a form in the html file that submits the user name via the input with an id of "user-name"
// in the typescript file, you would have something like this:
// const userNameInputEl = document.getElementById("user-name");
// the type of this element is HTMLElement | null
// that's because there's no way typescript would know if such element exists on the html file.
// so if you try to log that without checking it's existence, typescript would throw an error:
// console.log(userNameInputEl.value); -> "userNameInputEl is possibly null"
// to get around that, we need to check for it's existence:
// if (!userNameInputEl) {
//   throw new Error("Element not found!");
// }
// now if we try to log the element, and check for it's type, typescript would remove the null type
// from the element, because it knows you just check for it's existence in the line above.

// if you're in a position where checking for an element existance like this is too much and
// you want a quicker approach, you can add an exclamation mark after the line that could produce a null value
// such as:
// const anotherUserNameInputEl = document.getElementById("user-name")!;
// this tells typescript that the method before the exclamation mark, that theoretically could
// produce a null value, won't. THIS IS DANGEROUS! It could cause a runtime error if the method
// turns out to be null.
// you can use the ! not only in the place where you get the value, but in the place where you use the value.
// console.log(anotherUserNameInputEl!.value);
// if you need to do the opposite and tell typescript the value of that COULD be null, you can
// use the question mark in the place where you use the value, like this:
// console.log(anotherUserNameInputEl?.value); this tells typescript anotherUserNameInputEl could be null
// and therefore typescript should only perform the next step if the value is NOT null. You could say
// this is an inline-check. An elegant way instead of using the if (!anotherUserNameInputEl) approach.
// the downside is that you don't have a fallback code if the value turns out to be null.
// another solution we need is regarding the error on the .value part of the console.log expression.
// that one is happening because typescript doesn't know which type of HTMLElement that is.
// And since some of them doesn't have a value key, typescript throws an error.
// To fix that, we need to tell typescript which type of HTMLElement is that one we are getting.
// We do that by type casting, or type assertion. That's about converting one type to another type.
// To do that, we use the "as" operator:
// const someUserNameInputEl = document.getElementById(
//   "user-name"
// ) as HTMLInputElement;
// that also gets rid of the null type. So be careful.

// The unknown type is used when you don't know the type of a function's parameter and you don't want to
// allow everything by using any or a giant union type. The usage of the unknows type requires
// you to use some if statements inside that function.
// example:
function process(val: unknown) {
  if (
    typeof val === "object" &&
    !!val &&
    "log" in val &&
    typeof val.log === "function"
  ) {
    val.log();
  }
}
// unknows forces you to make sure you can safely execute this code. So you can't get a runtime error.
// if you use any type, you can call val.log() even if the parameter doesn't have that method.

// Optional values & Typescript
function generateError(msg?: string) {
  throw new Error(msg);
}
// the question mark after the msg parameter, bofore the :, tells typescript that the msg parameter
// is optional and may not be passed.
// you can also use this on objects
type ExampleUser = {
  name: string;
  age: number;
  role?: "admin" | "guest";
};
// this tells typescript that the key role is optional when instantiating an ExampleUser object.

// Nullish Coalescing is the concept of using the ?? operator to check if a value if stricly null or undefined.
// In javascript, there's the concept of falsy, which means being null, undefined, 0 or an empty string.
// so when you use something like:
let input = "";
const didProvideInput = input || false;
// console.log(didProvideInput); // -> false
// Typescript will look at this and say didProvideInput is false, because input is an empty string.
// So if you want to be more strict when checking only for null or undefined values, use the ?? operator
// like this:
const didProvideInputTwo = input ?? false;
// now, typescript will return false for didProvideInputTwo if and only if input is null or undefined.
// console.log(didProvideInputTwo); // -> ""
