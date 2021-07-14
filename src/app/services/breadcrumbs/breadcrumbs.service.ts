import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, ActivatedRoute} from '@angular/router';
//import { url } from 'inspector';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
//import { Breadcrumb } from './breadcrumb';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public path = new BehaviorSubject<String[]>([]);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        // only filter for NavigationEnd, which should have breadcrumbs
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        //get the name of the device 
        const strUrl = String(event['url']);
        const urlArray = strUrl.split('/');
        let gatewayId= '';
        if(urlArray.length>4){
            gatewayId = urlArray.pop();
        }
        this.setCrumbs(root, gatewayId);

      });
  }

  // recursively looks through the route tree to find breadcrumbs for the current page.
  private setCrumbs(route: ActivatedRouteSnapshot, s: string) {
    if (route) {
      if (route.data.breadcrumb) {
        //add  the device name when selecting the device
        if (s.length>0 && route.data.breadcrumb[route.data.breadcrumb.length-1]!=s){
        route.data.breadcrumb.push(s);
        }
        // let parsedCrumbs = this.checkForGatewayID(route.data.breadcrumb);
        // this.path.next(parsedCrumbs);
        //if (event) {
          //this.checkForID(event['url']);
       // }

        this.path.next(route.data.breadcrumb);
      }
      // go to the next element if not found
      if (route.firstChild){
        this.setCrumbs(route.firstChild,s);
      }
    }
  }

  // should find the gateway ID and display it on the breadcrumb
  private checkForID(path: string) {
    // path should be the end of the URL.

    return path;
  }
}
