function calculate() {
    const inputs = document.querySelectorAll('#inputs input');
    const values = {};
    inputs.forEach(input => {
        values[input.id] = parseFloat(input.value);
    });

    const resultsTextDiv = document.getElementById('resultsText');
    const resultsChartDiv = document.getElementById('resultsChart');
    resultsTextDiv.innerHTML = ''; // Limpiar texto
    resultsChartDiv.innerHTML = ''; // Limpiar gráfico

    const results = getResults(selectedFigure, values);
    for (const [key, value] of Object.entries(results)) {
        const p = document.createElement('p');
        p.innerText = `${key}: ${value}`;
        resultsTextDiv.appendChild(p);
    }

    Highcharts.chart('resultsChart', {
        chart: { type: 'bar' },
        title: { text: `Resultados de ${selectedFigure}` },
        xAxis: { categories: Object.keys(results) },
        series: [{ name: 'Valores', data: Object.values(results) }]
    });
}
let selectedFigure;

function selectFigure(figure) {
    selectedFigure = figure;
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = '';

    const inputFields = getInputFields(figure);
    inputFields.forEach(field => {
        const label = document.createElement('label');
        label.innerText = `${field}: `;
        const input = document.createElement('input');
        input.type = 'number';
        input.id = field;
        inputsDiv.appendChild(label);
        inputsDiv.appendChild(input);
        inputsDiv.appendChild(document.createElement('br'));
    });
}

function getInputFields(figure) {
    switch (figure) {
        case 'Triángulo': return ['Base', 'Altura', 'Lado1', 'Lado2', 'Lado3'];
        case 'Cuadrado': return ['Lado'];
        case 'Rectángulo': return ['Largo', 'Ancho'];
        case 'Círculo': return ['Radio'];
        case 'Cubo': return ['Lado'];
        case 'Esfera': return ['Radio'];
        case 'Cilindro': return ['Radio', 'Altura'];
        case 'Prisma Rectangular': return ['Largo', 'Ancho', 'Altura'];
    }
}

function getResults(figure, values) {
    switch (figure) {
        case 'Triángulo':
            const areaT = 0.5 * values['Base'] * values['Altura'];
            const perimetroT = values['Lado1'] + values['Lado2'] + values['Lado3'];
            return { Área: areaT, Perímetro: perimetroT };
        case 'Cuadrado':
            const areaC = Math.pow(values['Lado'], 2);
            const perimetroC = 4 * values['Lado'];
            return { Área: areaC, Perímetro: perimetroC };
        case 'Rectángulo':
            const areaR = values['Largo'] * values['Ancho'];
            const perimetroR = 2 * (values['Largo'] + values['Ancho']);
            return { Área: areaR, Perímetro: perimetroR };
        case 'Círculo':
            const areaCir = Math.PI * Math.pow(values['Radio'], 2);
            const perimetroCir = 2 * Math.PI * values['Radio'];
            return { Área: areaCir, Perímetro: perimetroCir };
        case 'Cubo':
            const volumenCubo = Math.pow(values['Lado'], 3);
            const areaCubo = 6 * Math.pow(values['Lado'], 2);
            return { Volumen: volumenCubo, Área: areaCubo };
        case 'Esfera':
            const volumenEs = (4 / 3) * Math.PI * Math.pow(values['Radio'], 3);
            const areaEs = 4 * Math.PI * Math.pow(values['Radio'], 2);
            return { Volumen: volumenEs, Área: areaEs };
        case 'Cilindro':
            const volumenCil = Math.PI * Math.pow(values['Radio'], 2) * values['Altura'];
            const areaCil = 2 * Math.PI * values['Radio'] * (values['Radio'] + values['Altura']);
            return { Volumen: volumenCil, Área: areaCil };
        case 'Prisma Rectangular':
            const volumenPr = values['Largo'] * values['Ancho'] * values['Altura'];
            const areaPr = 2 * (values['Largo'] * values['Ancho'] + values['Largo'] * values['Altura'] + values['Ancho'] * values['Altura']);
            return { Volumen: volumenPr, Área: areaPr };
        default:
            throw new Error(`Figura no reconocida: ${figure}`);
    }
}




function selectType(type) {
    figureType = type;
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';

    const figures = type === '2D' ? ['Triángulo', 'Cuadrado', 'Rectángulo', 'Círculo'] : ['Cubo', 'Esfera', 'Cilindro', 'Prisma Rectangular'];
    const figuresDiv = document.getElementById('figures');
    figuresDiv.innerHTML = '';
    figures.forEach(figure => {
        const btn = document.createElement('button');
        btn.innerText = figure;
        btn.onclick = () => selectFigure(figure);
        figuresDiv.appendChild(btn);
    });
}