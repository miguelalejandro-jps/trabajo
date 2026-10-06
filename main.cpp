#include <iostream>
using namespace std;

int main() {
    int numeros[10];

    cout << "Ingrese 5 numeros:" << endl;

    for (int i = 0; i < 5; i++) {
        cin >> numeros[i];
    }

    cout << "\nNumeros pares:" << endl;

    for (int i = 0; i < 5; i++) {
        if (numeros[i] % 2 == 0) {
            cout << numeros[i] << " ";
        }
    }

    cout << "\n\nNumeros impares:" << endl;

    for (int i = 0; i < 5; i++) {
        if (numeros[i] % 2 != 0) {
            cout << numeros[i] << " ";
        }
    }

    return 0;
}
