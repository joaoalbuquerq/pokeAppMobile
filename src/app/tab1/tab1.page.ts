import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LutaServiceService } from '../service/LutaService/luta-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  cep: String = ''
  resultado: any = null;
  resultadoPokemon: any = null;


  buscarCep(){
    if(this.cep == ""){
      alert("Digite o CEP");
      return;
    }else if(this.cep.length < 8 || this.cep.length > 8){
      alert("Quantidade de caracteres do CEP inválidos")
      return;
    }else{
      const url = `http://viacep.com.br/ws/${this.cep}/json/`

      this.http.get(url).subscribe(
        (data: any) => {
            if(data.erro){
              alert("CEP NAO ENCONTRADO");
              this.resultado = null;
            }else{
              this.resultado = data;
              console.table(data)
            } 
        }, (error) => {
          console.error(error)
          alert("Erro ao buscar o CEP");
        }
      )

      const numero = Math.floor(Math.random() * 100) + 1;
      const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${numero}`
      
      this.http.get(urlPokemon).subscribe(
        (data:any) => {
          this.resultadoPokemon=data;
          this.lutaService.setPokemon(this.resultadoPokemon)
        },(error) => {
          console.log(error)
          alert("Pokemon nao encontrado")
        }
      )
    }


  }
  constructor(private http: HttpClient, private lutaService: LutaServiceService) {}

}
