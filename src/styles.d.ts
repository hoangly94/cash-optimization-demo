// For CSS
declare module "*.css" {
    const styles: { [key: string]: string };
    export default styles;
}
declare module '*.module.css' {
    const styles: { [key: string]: string };
    export default styles;
  }