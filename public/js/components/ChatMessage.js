export default {
    name: 'TheChatMessageComponent',

    props: ['msg'],

    template: `
    <article class="chat-messages">
        <h2>{{ msg.message.user }} says: </h2>
        <p>{{ msg.message.content }} </p>
    </article>
    `
}