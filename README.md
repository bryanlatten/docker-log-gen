# docker-logging-bench
A quick and dirty to spew logs for benchmarking purposes. Intended for use in a container orchestration system, like DC/OS or k8s, to assess the maximum throughput of logging across nodes.


### Pre-reqs
- docker (1.12+ recommended)
- nodejs (8.0+)
- npm (5.0+)
- nodemon (dev-only, optional)

### Local Development

1. Clone repo
1. `npm i`
1. `npm start`
1. Alternatively, using `nodemon`: `nodemon npm start`

### Basic Usage

- Run container with its exposed web port, `docker run -p 3000:3000 bryanlatten/docker-log-gen`
- Spits out random lorem ipsum-generated log lines per request to `/` on the web interface
- Customize the output based on the following querystring parameters:

Variable | Example | Default | Description
--- | --- | --- | ---
n | n=100 | 1 | Number of log lines to produce per request
l | l=1024 | 64 | Number of bytes to log per output
d | d=0 | 1 | Adds ISO 8601 date to each output
i | i=TRANSACTION_ID | (none) | Identifier to add per line
s | s=\/ | ` \| ` | Separates line components from each other
x | x=0 | 1 | Adds a consistently-spaced counter to each output



### Clustered Usage, via DC/OS (Marathon) or Kubernetes

Run the container, using the healthcheck's frequency + querystring parameters to predictably control the scale of throughput. Or, hit `/` with standard benchmarking tools (`ab`, `jmeter`, `gatling`, `locust.io`) for maximum output.

- `marathon.json`: sample DC/OS application definition
- `manifest.yaml`: sample Kubernetes Pod definition

### TODO

- Accept querystring paramters as environment variables, run from Docker CLI
- Allow template-based formatting of output, for validation purposes
- Use Docker `HEALTHCHECK` command
