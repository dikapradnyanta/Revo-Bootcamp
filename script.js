
function areaValueCalculator(height, weight) {
    return (height * weight) / 2;
}

function perimeterValueCalculator(a, b, c) {
    return a + b + c;
}

function calculatedValue(){
    const typeCalculator = sessionStorage.getItem('type_kalkulator');
    if(!typeCalculator){
        sessionStorage.setItem('type_kalkulator', 'luas');
    }else{
        if (typeCalculator === "luas"){
        let height = parseFloat(document.getElementById('input-height').value);
        let weight = parseFloat(document.getElementById('input-weight').value);
        if (!height || !weight) { 
            // Memeriksa apakah ada input yang kosong
            alert("Harap isi semua input sebelum menghitung.");
            return;
        }
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            alert("Tinggi dan alas segitiga harus berupa angka yang lebih besar dari nol");
            return;
        }

        let area = areaValueCalculator(height, weight);
        let stepArea = "Luas = ½ × Alas × Tinggi";
        stepArea += "\nLuas = ½ × " + height + " × " + weight;
        stepArea += "\nLuas = " + area +" cm²";
        return { result: stepArea };
        }else if (typeCalculator === "keliling"){
        let a = parseFloat(document.getElementById('side1').value);
        let b = parseFloat(document.getElementById('side2').value);
        let c = parseFloat(document.getElementById('side3').value);

        if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
            return { error: "Panjang sisi-sisi segitiga harus berupa angka yang lebih besar dari nol." };
        }else if(!a || !b || !c) { // Memeriksa apakah ada input yang kosong
            alert("Harap isi semua input sebelum menghitung.");
            return;
        }
        let perimeter = perimeterValueCalculator(a, b, c);
        let stepPerimeter = "Keliling = Sisi 1 + Sisi 2 + Sisi 3";
        stepPerimeter += "\nKeliling = " + a + " + " + b + " + " + c;
        stepPerimeter += "\nKeliling = " + perimeter;
        return { result: stepPerimeter };  
        }

    }
    
}



function handleClick() {
    let resultObj = calculatedValue();
    let resultElement = document.getElementById('result');

    // Bersihkan elemen hasil terlebih dahulu
    resultElement.innerHTML = '';

    if (resultObj.error) {
        let errorElement = document.createElement('p');
        errorElement.textContent = "Error: " + resultObj.error;
        resultElement.appendChild(errorElement);
    } else {
        let steps = resultObj.result.split("\n");
        steps.forEach(step => {
            let p = document.createElement('p');
            p.textContent = step;
            resultElement.appendChild(p);
        });
    }
}

function resetHandle() {
    let inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach(function(input) {
        input.value = '';
    });

    document.getElementById('result').innerHTML = '';
}


function setInputCalculator(type) {
    let grid = document.getElementById('calculator-grid');

    if (type === "keliling") {
        sessionStorage.setItem("type_kalkulator",'keliling');

         // Menghapus semua isi dari calculator-grid
        grid.innerHTML = '';

        let keliling = ["a", "b", "c"];

        keliling.forEach(symbol => {
            const header = document.createElement('h2');
            header.textContent = "Sisi " + symbol;
            grid.appendChild(header);

            const inputValue = document.createElement('input');
            inputValue.id = "side" + symbol;
            inputValue.type = "number";
            grid.appendChild(inputValue);
        });
    } else if (type === "luas") {
        sessionStorage.setItem('type_kalkulator','luas');
        grid.innerHTML = ''; // Menghapus semua isi dari calculator-grid

        const tinggiHeader = document.createElement('h2');
        tinggiHeader.textContent = "Tinggi Segitiga";
        grid.appendChild(tinggiHeader);

        const inputHeight = document.createElement('input');
        inputHeight.id = "input-height";
        inputHeight.type = "number";
        grid.appendChild(inputHeight);

        const alasHeader = document.createElement('h2');
        alasHeader.textContent = "Alas Segitiga";
        grid.appendChild(alasHeader);

        const inputWeight = document.createElement('input');
        inputWeight.id = "input-weight";
        inputWeight.type = "number";
        grid.appendChild(inputWeight);
    }
}
