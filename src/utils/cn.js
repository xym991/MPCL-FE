export default function cn(...args) {
  return args.reduce((acc, classname) => acc + " " + classname, "");
}
