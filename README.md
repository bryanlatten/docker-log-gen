# docker-log-gen
A quick and dirty tool to spew logs for benchmarking purposes. Can operate in several modes:
- As a standalone container, using command-line flags to determine logging quantity and options. Acts in a similar manner to `ab`
- As a web server, using query-string options to determine logging quantity and options
- As part of a container orchestration system, like DC/OS or k8s, using the system's healthcheck to periodically force log generation

### Basic CLI Usage
- `docker run bryanlatten/docker-log-gen`
- Spits out random lorem ipsum-generated log lines on a timer
- Customize output based on the following command-line options:

```
  Options:

    -V, --version             output the version number
    -n, --number <size>       Number of outputs to perform (default 10 )
    -l, --length <size>       Bytes to log per output (default 64 bytes)
    -d, --dated               Include date per output (default 0)
    -c, --counter             Include a consistently-spaced counter to each output (default 1)
    -i, --identifier <text>   Add an identifier per outputs
    -r, --repeat <delay>      Repeat output every X seconds (default 2 sec), 0 to disable, incompatible with -w
    -s, --separator <symbol>  Use a symbol to separate log components (default  |  )
    -m, --multiline           Add newline and tab control characters into each output
    -w, --web                 Launch an HTTP server to log only during requests (default port = 3000)
    -h, --help                output usage information
```

### Web Server Usage
- Run container with its exposed web port, `docker run -p 3000:3000 bryanlatten/docker-log-gen -w`
- Spits out random lorem ipsum-generated log lines per request to `/` on the web interface
- Customize the output based on the following querystring parameters:

Variable | Example | Default | Description
--- | --- | --- | ---
n | n=100 | 1 | Number of log lines to produce per request
l | l=1024 | 64 | Number of bytes to log per output
d | d=0 | 1 | Adds ISO 8601 date to each output
i | i=TRANSACTION_ID | (none) | Identifier to add per line
s | s=\/ | ` \| ` | Separates line components from each other
c | c=0 | 1 | Adds a consistently-spaced counter to each output


### Clustered Usage, via DC/OS (Marathon) or Kubernetes

Run the container, using the healthcheck's frequency + query-string parameters to predictably control the scale of throughput. Or, hit `/` with standard benchmarking tools (`ab`, `jmeter`, `gatling`, `locust.io`) for maximum output.

- `examples/marathon.json`: sample DC/OS application definition
- `examples/kubernetes.yaml`: sample Kubernetes Pod definition

### Local Development

1. Clone repo, `cd docker-log-gen`
1. Install dependencies, `npm i`
1. Run the app `./bin/start` or `node ./bin/start`
