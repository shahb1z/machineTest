import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../entities/userentity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    // constructor(private readonly authService:AuthService){
    //     super();
    // }

    getRequest(context: ExecutionContext) {
        const ctx=GqlExecutionContext.create(context);
        return ctx.getContext().req
    }
    // async canActivate(context: ExecutionContext): Promise<boolean | Promise<boolean> | Observable<boolean>> {
    //     const ctx=GqlExecutionContext.create(context).getContext();
    //     const {email,password}=ctx.req.body.variables;
    //     const user:User=await this.authService.getUser(email);
    //     if(user && user.password==password)
    //     {
    //         ctx.user=user;
    //         return true;
    //     }
    //     else{
    //         throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    //     }
    // }
}
