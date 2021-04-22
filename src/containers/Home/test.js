//task 2
let arr=[
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
      [16,17,18,19,20],
      [21,22,23,24,26],
    ];
    
const convertArr=(arr)=>{
    let newArr = [];
    let elIndex=0;
    for(let i = 0; i < arr.length; i++){
      if (i%2===0){
        for (let j=0;j<arr[i].length;j++){
          //newArr.push(arr[i][j]);
            newArr[elIndex]=arr[i][j];
            elIndex++
        }
      }else{
        for (let j=arr.length-1;j>=0;j--){
          //newArr.push(arr[i][j]);
            newArr[elIndex]=arr[i][j];
            elIndex++;
        }
      }
    }
      return newArr;
    }
    console.log("result:",convertArr(arr));



//task 1
let arr1=[1,2,3,4,5,6,7];
let arr2=[1,2,3,4,5,6];
const compare=(arr1, arr2)=>{

    if (arr1.length===arr2.length){
        console.log("same size");
        return;
    }
    let largerArr=arr1.length>arr2.length?arr1:arr2;
    let smallerArr=arr1.length<arr2.length?arr1:arr2;
    let result=[]
    for (let i=0;i<largerArr.length;i++){
        let match=false
        for (let j=0;j<smallerArr.length;j++){
            if (largerArr[i]===smallerArr[j]){
                match=true;
                break
            }
        }
        if (match===true){
            continue
        }
        result.push(largerArr[i])
    }
    return result
}
console.log(compare(arr1,arr2));

let arr1=[9,8,7,6,5];
let arr2=[6,5,9,7];

const compare=(arr1,arr2)=>{
    let result=[];
    for (let i=0;i<arr1.length;i++){
        let match=false;
        for (let j=0;j<arr2.length;j++){
            if (arr1[i]===arr2[j]){
                match=true
                break
            }
        }
        if (match){
            continue
        }
        result.push(arr1[i])
    }
    return result
}
console.log("result: ",compare(arr1, arr2)) //output: 8


//for one difference

let arr1=[9,8,7,6,5, 10];
let arr2=[6,5,9,7];

const compare=(arr1,arr2)=>{
    let result;
    for (let i=0;i<arr1.length;i++){
        let match=false;
        for (let j=0;j<arr2.length;j++){
            if (arr1[i]===arr2[j]){
                match=true
                break
            }
        }
        if (match){
            continue
        }
        result=(arr1[i]);
        break
    }
    return result
}
console.log("result: ",compare(arr1, arr2)) //output: 8

//for multiple difference
let arr1=[9,8,7,6,5,10,11];
let arr2=[6,5,9,7];

const compare=(arr1,arr2)=>{
    let result=[];
    let countOfDifferent=0;
    for (let i=0;i<arr1.length;i++){
        let match=false;
        for (let j=0;j<arr2.length;j++){
            if (arr1[i]===arr2[j]){
                match=true
                break
            }
        }
        if (match){
            continue
        }
        result[countOfDifferent]=(arr1[i]);
        countOfDifferent++
    }
    return result
}
console.log("result: ",compare(arr1, arr2)) //output: [8,10,11]