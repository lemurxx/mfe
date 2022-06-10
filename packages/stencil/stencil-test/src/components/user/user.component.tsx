import { Component, Prop, h } from '@stencil/core';


@Component({
    tag: 'stcl-user',
    styleUrl: 'user.component.css',
    shadow: true,
})
export class StclUser {

    @Prop() first: string;
    @Prop() last: string;
    @Prop() imageUrl: string;
    @Prop() email: string;

    render() {
        return <div class="root">
            <div class="picture">
                <img src={this.imageUrl} />
            </div>
            <div>
                <h4>{this.first} {this.last}</h4>
                <div><a href={`mailto:${this.email}`}>{this.email}</a></div>
            </div>
        </div>;
    }
}