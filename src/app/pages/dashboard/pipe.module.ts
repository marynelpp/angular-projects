import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {search} from "./pipe"; // <---

@NgModule({
  declarations:[search], // <---
  imports:[CommonModule],
  exports:[search] // <---
})

export class MainPipe{}