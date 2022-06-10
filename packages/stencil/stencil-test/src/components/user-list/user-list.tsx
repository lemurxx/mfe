import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'stcl-user-list',
    styleUrl: 'user-list.css',
    shadow: true,
})
export class StclUserList {

    @Prop({
        mutable: true,
        // reflect: true
    }) count = 0;

    @State() users: {
        first: string,
        last: string,
        imageUrl: string,
        email: string
    }[] = null;

    async fetchUsers() {
        const result = await fetch(`https://randomuser.me/api/?results=${this.count}`);
        const data = await result.json();
        this.users = data.results.map(usr => ({ first: usr.name.first, last: usr.name.last, imageUrl: usr.picture.thumbnail, email: usr.email }));
        console.log(this.users);
    }

    componentWillLoad() {
        this.fetchUsers();
    }

    render() {
        return <div>
            <ul>
                {
                    this.users?.map(usr => (
                        <li>
                            <stcl-user {...usr}></stcl-user>
                        </li>
                    ))
                }
            </ul>
        </div>;
    }
}