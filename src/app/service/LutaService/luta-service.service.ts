import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LutaServiceService {

  private pokemon:any;

  setPokemon(data:any){
    this.pokemon=data;
  }

  getPokemon(){
    return this.pokemon;
  }

  clearPokemon(){
    this.pokemon = null;
  }

  constructor() { }
}
