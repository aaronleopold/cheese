import open from 'open';

// reroute new windows to default browser
export default function createOpenHandler(
  _: Electron.Event,
  contents: Electron.WebContents
) {
  const anyContents = contents as any;
  anyContents.on('new-window', (e: Electron.NewWindowEvent, url: string) => {
    e.preventDefault();
    open(url);
  });
}
