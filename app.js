document.addEventListener("DOMContentLoaded", () => {
    LinesMenu();
    CriacaoTwoTables();
});

function LinesMenu() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let divLines = document.getElementById("LinesTags");
    divLines.innerHTML = '';
    Configs.Lines.forEach(Line => {
        divLines.innerHTML += `
            <span id=${Line.LineID} onclick=LineClick(this.id) ${Configs.Menu.LineChose == Line.LineID ? "class=LineActive" : ''}>${Line.NameLine}</span>
        `;
    });
    CriacaoTwoTables();
}

function LineClick(line) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Menu.OldLine = Configs.Menu.LineChose;
    Configs.Menu.LineChose = line;
    console.log(`${line} acionada!`)
    localStorage.setItem('Configs', JSON.stringify(Configs));
    LinesMenu();
}

function CriacaoTwoTables() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let mainDiv = document.getElementById('TwoTables');
    mainDiv.innerHTML = '';

    let PartidasPontos = "";
    let PartidasAbates = "";


    for (let x = 1; x <= Configs.Menu.Quedas; x++) {
        PartidasPontos += `
            <tr>
                <td>#${x}</td>
                <td><input type=number id=q${x} oninput="ValueUpdate(this.id, this.value, p${x})"></td>
                <td><input type=number id=a${x} oninput="ValueUpdate(this.id, this.value, p${x})"></td>
                <td id=p${x}></td>
            </tr>`;
        PartidasAbates += `
            <tr>
                <td>#${x}</td>
                <td><input type=number></td>
                <td><input type=number></td>
                <td><input type=number></td>
                <td><input type=number></td>
            </tr>`;
    }

    mainDiv.innerHTML += `
        <table id=table1 class=TableChose>
            <tr>
                <td>Line</td>
                <td colspan=3><input type=text oninput=RenameLine(this.value) id=NameLine></td>
                <td rowspan=${Configs.Menu.Quedas + 3} class=btnPlayer onclick="SwitchTbl(2)">Players</td>
            </tr>
            <tr>
                <td>Quedas</td>
                <td>Posição</td>
                <td>Abates</td>
                <td>Pontos</td>
            </tr>
            ${PartidasPontos}
            <tr>
                <td colspan=3>Pontuação</td>
                <td id=res>0</td>
            </tr>
        </table>

        <table id=table2 class=TableNoChose>
            <tr>
                <td colspan=5>Abates Individuais</td>
                <td rowspan=${Configs.Menu.Quedas + 2} class=btnPlayer onclick="SwitchTbl(1)">Quedas</td>
            </tr>
            <tr>
                <td>Partidas</td>
                <td><input type=text placeholder=Jogador1></td>
                <td><input type=text placeholder=Jogador2></td>
                <td><input type=text placeholder=Jogador3></td>
                <td><input type=text placeholder=Jogador4></td>
            </tr>
            ${PartidasAbates}
        </table>                                            
    `;
    validarTable();
}

function SwitchTbl(key) {
    if (key == 2) {
        document.getElementById('table1').classList = 'TableNoChose';
        document.getElementById('table2').classList = 'TableChose';
    }
    else {
        document.getElementById('table2').classList = 'TableNoChose';
        document.getElementById('table1').classList = 'TableChose';
    }
}

function RenameLine(inp) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Lines.forEach(Line => {
        if (Line.LineID == Configs.Menu.LineChose) {
            document.getElementById(Line.LineID).innerText = inp;
            Line.NameLine = inp;
        }
        // console.log(Configs);

    })
    SendArray(Configs);
}



function SendArray(Array) {
    localStorage.setItem('Configs', JSON.stringify(Array));
}

function validarTable() {
    let Configs = JSON.parse(localStorage.getItem('Configs'))
    Configs.Lines.forEach(L => {
        if (L.LineID == Configs.Menu.LineChose) {
            document.getElementById(`NameLine`).value = L.NameLine.toLowerCase().includes('line') ? '' : L.NameLine;
            for (let x = 1; x <= Configs.Menu.Quedas; x++) {
                document.getElementById(`a${x}`).value = L[`a${x}`] == 0 ? "" : L[`a${x}`];
                document.getElementById(`q${x}`).value = L[`q${x}`] == 0 ? "" : L[`q${x}`];
                document.getElementById(`p${x}`).innerText = L[`p${x}`] == 0 ? "" : L[`p${x}`];
            }
            document.getElementById('res').innerText = L.res;
        }
    })
}

function ValueUpdate(id, value, ponto) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Lines.forEach(l => {
        if (l.LineID == Configs.Menu.LineChose) {
            l[id] = value == '' ? 0 : parseInt(value)
            let r = 0;
            for (let x = 1; x <= Configs.Menu.Quedas; x++) {
                let a = isNaN(l[`a${x}`]) ? 0 : l[`a${x}`];
                console.log(a);

                l[`p${x}`] = l[`q${x}`] == 1 ? 12 + l[`a${x}`] : l[`q${x}`] >= 2 && l[`q${x}`] <= 10 ? (11 - l[`q${x}`]) + l[`a${x}`] : l[`a${x}`];
                r += l[`p${x}`];
            }
            l.res = r;
            ponto.innerText = l[ponto.id];
            document.getElementById('res').innerText = r;
        }
    })

    SendArray(Configs);
}