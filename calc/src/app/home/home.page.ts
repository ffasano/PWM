import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public display = 0;
    public totale = 0;
    public operazione = '';
    public premutoOperatore = false;
    public errore = '';
    public mostraTotale = false;


    pressNumber(n) {
        this.mostraTotale = false;
        if (this.errore !== '') {
            this.errore = '';
            this.operazione = '';
            this.display = 0;
            this.totale = 0;
        }

        if (this.premutoOperatore || this.display === 0) {
            this.premutoOperatore = false;
            this.display = n;
        } else {
            this.display = this.display * 10 + n;
        }
    }
    
    pippo2Test() {
        return;
    }
    pressOperatore(op) {

        // L'ultimo tasto era già un operatore. Lo sostituisco
        if (this.premutoOperatore) {
            this.operazione = op;
            return;
        } else {
            this.premutoOperatore = true;
        }

        // E' il primo operatore richiamato. Non devo eseguire il calcolo
        if (this.operazione === '') {
            this.operazione = op;
            this.totale = this.display;
            this.mostraTotale = false;
            return;
        }

        // Calcolo il totale usando l'operatore precedente
        this.calcola();

        // Salvo l'ultimo operatore per il prossimo calcolo
        this.operazione = op;
        this.mostraTotale = true;
    }

    inizializza() {
        this.totale = 0;
        this.display = 0;
        this.operazione = '';
        this.mostraTotale = false;
        this.premutoOperatore = false;
    }

    calcola() {
        // Gestisco gli operatori matematici precedentemente richiamati
        switch (this.operazione) {
            case '+' : {
                this.totale = this.totale + this.display;
                break;
            }
            case '-' : {
                this.totale = this.totale - this.display;
                break;
            }
            case 'x' : {
                if (this.display === 0) {
                    this.totale = this.display;
                } else {
                    this.totale = this.totale * this.display;
                }
                break;
            }
            case '/' : {
                if (this.display === 0) {
                    this.errore = 'Divisione per zero';
                } else {
                    this.totale = this.totale / this.display;
                }
                break;
            }
        }
    }

}
