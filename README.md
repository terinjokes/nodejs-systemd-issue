This is a simple node HTTP service that demonstrates an issue listening to file descriptors from systemd.

1. Copy nodejs.socket and nodejs.service into /etc/systemd/system/. Modify “collapsify.service” to point “ExecStart” to “server.js” in this directory.
2. Start the “nodejs” service

  ```
  sudo systemctl start nodejs
  ```

3. Attempt to connect to the service.

  ```
  curl http://localhost:8020/
  ```

4. If operating correctly, you should see the “Hello World!” demo text. If not operating correctly, curl will remain running.

  While in the inoperable state, you can attach to the running server.js process with `sudo strace -p $PID` and rerun the curl.
  You’ll notice that the `accept4` syscall happened with a valid return, but the `read` syscall never happens.

5. Once you’re done debugging this, stop the service and remove the unit files from /etc/systemd/system/.

  ```
  sudo systemctl stop nodejs.{service,socket}
  sudo rm /etc/systemd/system/nodejs.{service,socket}
  ```
