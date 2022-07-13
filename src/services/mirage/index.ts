import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        created_at() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 20);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const pageAsNumber = Number(page);
        const perPageAsNumber = Number(per_page);

        const total = schema.all('user').length;

        const pageStart = (pageAsNumber - 1) * perPageAsNumber;
        const pageEnd = pageStart + perPageAsNumber;

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}

export { makeServer };
