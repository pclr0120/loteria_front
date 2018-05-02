import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  NumCarta = 1;
  Carta: any[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  Selec: any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  cartasAverificar:any[]=[0,0,0,0];
  constructor() { }

  ngOnInit() {
  }

//
  childdata="";
//CONEXION CON EL COMPOENETE MENUJUGADA, OBTIENE EL NUMERO DE LA JUGADA A VERIFICAR
  onClicked(value:string){

    this.childdata=value;
    //MANDA A VERIFICAR
   
    this.VerificarJugar(value);
    console.log("Selec:",this.Selec)
  }
  Holi(pos){
    //En pos viene el id de la carta en cuestion
    //console.log("Holi "+ this.Carta[pos]);
 
    if(this.Selec[pos] == 1){
      this.Selec[pos] = 0;
    }else{
      this.Selec[pos] = 1;
    }
  }

  //AQUI SE MANDARA LA JUGADA A VERIFICAR 
  VerificarJugar(jugada:string ){

    console.log("jugada:",jugada);
    if(jugada=='0')
        this.Chorro();
 
    if(jugada=='1')
      this.Centro();
      if(jugada=='2')
      this.Esquinas();
      if(jugada=='3')
      this.Llena();
    
    
      

      console.log("Verificar cartas:",this.cartasAverificar);

    
  }

  //Para verificar con back-end las jugadas se le enviara Un arreglo con las cartas de tal jugada
  //Los 4 metodos devuelven un arreglo con las cartas a vericar

    Chorro():any[]{

          this.cartasAverificar.length=0;
          
          var x=0;
              for(var i=0; i< this.Selec.length;i++ ){
            
                    if(i<4 && this.Selec[i]==1)
                    {
              
                      this.cartasAverificar[i]=this.Carta[i];
                  
                      if(this.cartasAverificar.length>3 &&this.Selec[0]!=0 && this.Selec[1]!=0 && this.Selec[2]!=0 && this.Selec[3]!=0)
                      {
                        console.log("chorro1");
                          return this.cartasAverificar;
                      }
                        else
                              x=x+1;
                      if(x>0 && i==3)
                      {
                                this.cartasAverificar=[];
                                console.log("fallido",this.cartasAverificar);
                                x=0;
                      }
                            

                      
                    }

                    //chorro2
                    if(i<8 && this.Selec[i]==1)
                    {
              
                      this.cartasAverificar[i]=this.Carta[i];
                  
                      if(this.cartasAverificar.length>3 &&this.Selec[4]!=0 && this.Selec[5]!=0 && this.Selec[6]!=0 && this.Selec[7]!=0)
                      {
                        console.log("chorro2");
                          return this.cartasAverificar;
                      }
                        else
                              x=x+1;
                      if(x>0 && i==7)
                      {

                                this.cartasAverificar=[];
                                console.log("fallido",this.cartasAverificar);
                                x=0;
                      }
                            

                      
                    }
                      //chorro3
                      if(i<11 && this.Selec[i]==1)
                      {
                
                        this.cartasAverificar[i]=this.Carta[i];
                    
                        if(this.cartasAverificar.length>3 &&this.Selec[8]!=0 && this.Selec[9]!=0 && this.Selec[10]!=0 && this.Selec[11]!=0)
                        {
                          console.log("chorro3");
                            return this.cartasAverificar;
                        }
                          else
                                x=x+1;
                        if(x>0 && i==11)
                        {
    
                                  this.cartasAverificar=[];
                                  console.log("fallido",this.cartasAverificar);
                                  x=0;
                        }
                              
    
                        
                      }
                      if(i<16 && this.Selec[i]==1)
                      {
                
                        this.cartasAverificar[i]=this.Carta[i];
                    
                        if(this.cartasAverificar.length>3 &&this.Selec[12]!=0 && this.Selec[13]!=0 && this.Selec[14]!=0 && this.Selec[15]!=0)
                        {
                          console.log("chorro4");
                            return this.cartasAverificar;
                        }
                          else
                                x=x+1;
                        if(x>0 && i==15)
                        {
    
                                  this.cartasAverificar=[];
                                  console.log("fallido",this.cartasAverificar);
                                  x=0;
                        }
                              
    
                        
                      }
                  
                      
                    
                        if(this.Selec[0]!=0 && this.Selec[4]!=0 && this.Selec[8]!=0 && this.Selec[12]!=0)
                        {
                          console.log("chorro5");
                            return this.cartasAverificar;
                        }
                        if(this.Selec[1]!=0 && this.Selec[5]!=0 && this.Selec[9]!=0 && this.Selec[13]!=0)
                        {
                          console.log("chorro6");
                            return this.cartasAverificar;
                        }
                        if(this.Selec[2]!=0 && this.Selec[6]!=0 && this.Selec[10]!=0 && this.Selec[14]!=0)
                        {
                          console.log("chorro7");
                            return this.cartasAverificar;
                        }
                        if(this.Selec[3]!=0 && this.Selec[7]!=0 && this.Selec[11]!=0 && this.Selec[15]!=0)
                        {
                          console.log("chorro8");
                            return this.cartasAverificar;
                        }
                        if(this.Selec[0]!=0 && this.Selec[5]!=0 && this.Selec[10]!=0 && this.Selec[15]!=0)
                        {
                          console.log("chorro9");
                            return this.cartasAverificar;
                        }
                        if(this.Selec[3]!=0 && this.Selec[6]!=0 && this.Selec[9]!=0 && this.Selec[12]!=0)
                        {
                          console.log("chorro10");
                            return this.cartasAverificar;
                        }
                        
                              
    
                        
                      
              }
        

              return null;
          
          
          

  }

    Centro():any[]{
  
      if(this.Selec[5]!=0 && this.Selec[6]!=0 && this.Selec[9]!=0 && this.Selec[10]!=0)
      {
        console.log("centro");
        this.cartasAverificar[0]=this.Carta[5];
        this.cartasAverificar[1]=this.Carta[6];
        this.cartasAverificar[2]=this.Carta[9];
        this.cartasAverificar[3]=this.Carta[10];
          return this.cartasAverificar;
      }else
      console.log("El centro no esta completo");
      


    }


    Esquinas():any[]{
    
      if(this.Selec[0]!=0 && this.Selec[3]!=0 && this.Selec[12]!=0 && this.Selec[15]!=0)
      {
        console.log("Esquinas");
        this.cartasAverificar[0]=this.Carta[0];
        this.cartasAverificar[1]=this.Carta[3];
        this.cartasAverificar[2]=this.Carta[11];
        this.cartasAverificar[3]=this.Carta[15];
          return this.cartasAverificar;
      }else
      console.log("Las esquinas no estan completas");
      


    }

    Llena():any[]{
      var x=0;
      for(var i=0; i< this.Selec.length;i++ ){
        if(this.Selec[i])
            x=x+1;
      }

      
      if(x==16)
      {
        console.log("llena");
        return this.Carta;
      }
      else console.log("falta llenar la carta");
      


    }
    


}
